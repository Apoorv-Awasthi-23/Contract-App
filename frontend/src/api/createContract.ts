import axios from "axios";

interface Contract {
  id: string;
  clientName: string;
  contractData: Record<string, unknown>;
  status: "Draft" | "Finalized";
  createdAt: string;
}

const server = "/api";
const apiClient = axios.create({
  baseURL: server,
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchContracts = async () => {
  try {
    const res = await apiClient.get("/contracts");
    return res.data;
  } catch (error) {
    return error;
  }
};

export const createContract = async (
  contractData: Omit<Contract, "id" | "createdAt">
): Promise<Contract> => {
  const response = await apiClient.post<Contract>("/createContract", contractData);
  return response.data;
};


export const updateContract = async (id:string, updatedInfo : Partial<Contract>) => { 
    try {
      const res = await apiClient.put(`/contracts/${id}`, updatedInfo);
      return res.data;

  }
    catch (err) {
      return err;
  }
}

export const deleteContract = async (id:string) => {
    try {
      const res = await apiClient.delete(`/contracts/${id}`);
      return res.data;
    }
    catch (err) {
      return err;
    }
}