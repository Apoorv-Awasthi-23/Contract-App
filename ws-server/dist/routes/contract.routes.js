"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = require("../controllers/controller");
const router = express_1.default.Router();
router.post("/createContract", controller_1.createContract);
// router.get("/contracts", getContracts);
router.get("/contracts/:id", controller_1.getContractById);
router.put("/contracts/:id", controller_1.updateContract);
router.delete("/contracts/:id", controller_1.deleteContract);
exports.default = router;
