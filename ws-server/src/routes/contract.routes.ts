import express from "express";
import { createContract,getContractById,updateContract,deleteContract } from "../controllers/controller"
import e from "express";
const router = express.Router()

router.post("/createContract", createContract);

// router.get("/contracts", getContracts);

router.get("/contracts/:id", getContractById);

router.put("/contracts/:id", updateContract);

router.delete("/contracts/:id", deleteContract);

export default router;