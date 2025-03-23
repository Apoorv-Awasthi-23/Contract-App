"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const contract_routes_1 = __importDefault(require("./routes/contract.routes"));
const cors_1 = __importDefault(require("cors"));
const app = require("express")();
app.use(express_1.default.json());
app.use("/api", contract_routes_1.default);
app.use((0, cors_1.default)({ origin: "http://localhost:5173" }));
app.listen(5000, () => {
    console.log("Server is running on port 5000");
});
