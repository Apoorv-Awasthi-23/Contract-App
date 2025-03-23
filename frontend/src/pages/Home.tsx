import { useEffect, useState } from "react";
import {  deleteContract,fetchContracts } from "../api/createContract";
import { Link } from "react-router-dom";

interface Contract {
  id: string;
  clientName: string;
  contractData: Record<string, unknown>;
  status: "Draft" | "Finalized";
  createdAt: string;
}


const Home = () => {
  const [contracts, setContracts] = useState<Contract[]>([]);

  useEffect(() => {
    fetchContracts().then(setContracts);
   
  }, []);

  const handleDelete = async (id: string) => {
    await deleteContract(id);
    setContracts(contracts.filter((contract) => contract.id !== id));
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Contracts</h1>
      <Link to="/upload" className="bg-blue-500 text-white px-4 py-2 rounded">
        Upload Contract
      </Link>
      <ul className="mt-4 space-y-4">
        {contracts.map((contract) => (
          <li key={contract.id} className="flex justify-between p-4 border">
            <span>
              {contract.clientName} ({contract.status})
            </span>
            <div>
              <Link to={`/edit/${contract.id}`} className="text-blue-500 mr-4">
                Edit
              </Link>
              <button
                onClick={() => handleDelete(contract.id)}
                className="text-red-500"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
