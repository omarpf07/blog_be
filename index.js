import express from "express";
import cors from "cors";
import "dotenv/config";
import userRoute from "./src/routes/user.route";

const app = express();
const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/user', userRoute);

app.listen(PORT, () => {
  console.log(`⚡️ Server is running on port ${HOST}:${PORT}.`);
});
