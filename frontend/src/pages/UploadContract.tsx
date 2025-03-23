import { useState } from "react";
import { createContract } from "../api/createContract";
import { useNavigate } from "react-router-dom";

const UploadContract = () => {
  const [clientName, setClientName] = useState("");
  const [contractData, setContractData] = useState(
    JSON.stringify(
      {
        terms: "Payment due within 30 days",
        amount: 1000,
      },
      null,
      2
    )
  ); // Pre-filled text (but will not be validated)

  const [status, setStatus] = useState<"Draft" | "Finalized">("Draft"); // Default status
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // ✅ No JSON validation - contractData is sent as a string
      await createContract({
        clientName,
        contractData, // Send as a raw string
        status,
      });

      navigate("/");
    } catch (err) {
      console.error("❌ API Error:", err);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Upload Contract</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Client Name Input */}
        <div>
          <label className="block font-semibold">Client Name:</label>
          <input
            type="text"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            required
            className="border p-2 w-full"
            placeholder="Enter client name"
          />
        </div>

        {/* Contract Data Input (Text) */}
        <div>
          <label className="block font-semibold">Contract Data:</label>
          <textarea
            value={contractData}
            onChange={(e) => setContractData(e.target.value)}
            required
            className="border p-2 w-full h-32 font-mono"
            placeholder="Enter contract details"
          />
        </div>

        {/* Status Dropdown */}
        <div>
          <label className="block font-semibold">Status:</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as "Draft" | "Finalized")}
            required
            className="border p-2 w-full"
          >
            <option value="Draft">Draft</option>
            <option value="Finalized">Finalized</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded w-full"
        >
          Submit Contract
        </button>
      </form>
    </div>
  );
};

export default UploadContract;
