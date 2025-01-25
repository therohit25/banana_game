import mongoose from 'mongoose';

const url = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.pwen0.mongodb.net/${process.env.DB_NAME}`;

mongoose
  .connect(url)
  .then((res) => {
    console.log('Connected to database', res.connections[0].name);
  })
  .catch((err) => {
    console.error(url);
    console.log(`Error connecting to database :- ${err}`);
  });
