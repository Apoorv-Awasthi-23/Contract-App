"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteContract = exports.updateContract = exports.getContractById = exports.createContract = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const prisma = new client_1.PrismaClient();
const contractSchema = zod_1.z.object({
    clientName: zod_1.z.string().min(3).max(200),
    contractData: zod_1.z.any(),
    status: zod_1.z.enum(["Draft", "Finalized"]),
});
const createContract = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parsedData = contractSchema.parse(req.body);
        console.log("parsedData", parsedData);
        const newContract = yield prisma.contract.create({
            data: {
                clientName: parsedData.clientName,
                contractData: parsedData.contractData,
                status: parsedData.status || "Draft",
            },
        });
        res.status(201).json(newContract);
    }
    catch (error) {
        res.status(400).send(error);
    }
});
exports.createContract = createContract;
const getContractById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const contracts = yield prisma.contract.findUnique({
            where: {
                id: parseInt(id),
            },
        });
        res.json(contracts);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.getContractById = getContractById;
const updateContract = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        console.log("id", id);
        const validatedData = contractSchema.partial().parse(req.body); // Partial allows optional updates
        const updatedContract = yield prisma.contract.update({
            where: { id: parseInt(id) },
            data: validatedData,
        });
        res.status(200).json(updatedContract);
    }
    catch (error) {
        res.status(400).json({
            error: Error,
        });
    }
});
exports.updateContract = updateContract;
const deleteContract = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const numId = parseInt(id);
        yield prisma.contract.delete({ where: { id: numId } });
        res.status(200).json({ message: "Contract deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to delete contract" });
    }
});
exports.deleteContract = deleteContract;
