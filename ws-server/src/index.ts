import express from "express";
import router from "./routes/contract.routes";
const app = require("express")();

app.use(express.json());
app.use("/api", router);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
