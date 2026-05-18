import "dotenv/config";
import express from "express";
import { createServer } from "http";
import router from "./router";
import cors from "cors";
import cookieParser from "cookie-parser";
import { initSocket } from "./socket";

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

const app = express();
const httpServer = createServer(app);

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

app.use("/api", router);

initSocket(httpServer);

httpServer.listen(3000, () => {
  console.log("app running in port: ", 3000);
});
