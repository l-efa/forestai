import "dotenv/config";
import express from "express";
import router from "./router";
import cors from "cors";
import cookieParser from "cookie-parser";

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

const app = express();

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

app.use("/api", router);

console.log("starting");

app.listen(3000, () => {
  console.log("app running in port: ", 3000);
});
