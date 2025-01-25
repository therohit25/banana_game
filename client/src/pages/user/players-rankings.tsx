import { Box, CircularProgress, Paper, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { fetchPlayers } from "../../api/get-players";
import DataTable from "../../components/table";
import { socket } from "../../helpers/socket";
import UserLayout from "./layout";

const PlayersRankings = () => {
  const { data, isLoading, isFetched } = useQuery({
    queryKey: ["players"],
    queryFn: fetchPlayers,
    retry: false,
    refetchOnWindowFocus: false,
  });

  const [players, setPlayers] = useState([]);

  useEffect(() => {
    socket.on("rankings-updated", (data: any) => {
      setPlayers(data);
    });

    return () => {
      socket.off("rankings-updated");
    };
  }, []);
  useEffect(() => {
    if (isFetched) {
      setPlayers(data);
    }
  }, [isFetched]);

  return (
    <UserLayout>
      <Box
        sx={{
          backgroundColor: "#f4f4f4",
          minHeight: "calc(100vh - 64px)", // Adjust for AppBar height
          py: 4,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            maxWidth: "900px",
            mx: "auto",
            p: 3,
            backgroundColor: "#fff",
            borderRadius: "16px",
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            textAlign="center"
            sx={{
              color: "#333",
              mb: 3,
              textTransform: "uppercase",
              letterSpacing: "2px",
            }}
          >
            Players Rankings
          </Typography>
          {isLoading ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{ height: "200px" }}
            >
              <CircularProgress size={50} />
            </Box>
          ) : (
            <DataTable
              columns={Object.keys(players?.[0] || {}).filter(
                (column) =>
                  column.toLowerCase() !== "_id" &&
                  column.toLowerCase() !== "userid"
              )}
              rows={players}
            />
          )}
        </Paper>
      </Box>
    </UserLayout>
  );
};

export default PlayersRankings;
