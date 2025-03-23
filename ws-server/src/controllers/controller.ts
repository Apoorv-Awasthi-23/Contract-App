import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { z } from "zod";

const prisma = new PrismaClient();

const contractSchema = z.object({
  clientName: z.string().min(3).max(200),
  contractData: z.any(),
  status: z.enum(["Draft", "Finalized"]),
});

export const getContracts = async (req: Request, res: Response) => { 
  try {
    const contracts = await prisma.contract.findMany();
    res.json(contracts);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const createContract = async (req: Request, res: Response) => {
  try {
    const parsedData = contractSchema.parse(req.body);
    console.log("parsedData", parsedData);

    const newContract = await prisma.contract.create({
      data: {
        clientName: parsedData.clientName,
        contractData: parsedData.contractData,
        status: parsedData.status || "Draft",
      },
    });
    res.status(201).json(newContract);
  } catch (error) {
    res.status(400).send(error);
  }
};
export const getContractById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const contracts = await prisma.contract.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    res.json(contracts);
  } catch (error) {
    res.status(400).json(error);
  }
};
export const updateContract = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log("id", id);
    const validatedData = contractSchema.partial().parse(req.body); // Partial allows optional updates

    const updatedContract = await prisma.contract.update({
      where: { id: parseInt(id) },
      data: validatedData,
    });

    res.status(200).json(updatedContract);
  } catch (error) {
    res.status(400).json({
      error: Error,
    });
  }
};

export const deleteContract = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const numId = parseInt(id);
    await prisma.contract.delete({ where: { id: numId } });

    res.status(200).json({ message: "Contract deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete contract" });
  }
};
