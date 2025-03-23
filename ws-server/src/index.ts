import express from "express";
import router from "./routes/contract.routes";
import cors from "cors";
const app = require("express")();

app.use(express.json());
app.use("/api", router);
app.use(cors({ origin: "http://localhost:5173" }));

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
