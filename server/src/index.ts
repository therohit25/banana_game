import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { Server as HttpServer } from "http";
import { Server as SocketServer } from "socket.io";
import "./config/connection";
import { JwtPayload, verifyJwtToken } from "./helpers/jwt";
import Routes from "./routes";
import { clickCountService } from "./services/click-count.service";

const app = express();
const server = new HttpServer(app);

const io = new SocketServer(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());

new Routes(app);

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  const headers = socket.handshake.headers;

  const accesstoken = (headers["accesstoken"] || "") as unknown as string;
  socket.on("click", async ({ count }) => {
    const user = verifyJwtToken(accesstoken) as JwtPayload;

    await clickCountService.updateUserCount(count, user.id);

    const result = await clickCountService.getPlayersWithCount();

    const filteredResult = result.map((player: any) => {
      const { _doc } = player;
      const { user, ...rest } = _doc;
      return {
        ...rest,
        email: user.email,
        userId: user._id,
      };
    });

    io.emit("rankings-updated", filteredResult);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
