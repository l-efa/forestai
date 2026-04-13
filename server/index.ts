import "dotenv/config";
import express from "express";
import router from "./router";
import cors from "cors";

var corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

const app = express();

app.use(express.json());
app.use(cors(corsOptions));

app.use("/api", router);

console.log("starting");

app.listen(3000, () => {
  console.log("app running in port: ", 3000);
});
