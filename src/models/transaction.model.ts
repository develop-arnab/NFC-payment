import mongoose from "mongoose";
const TransactionSchema = new mongoose.Schema(
  {
    sender: { type: String, required: false, unique: false },
    receiver: { type: String, required: false },
    amount: { type: String, required: false },
    timestamp: { type: String, required: false },
    status: { type: String, required: false },
  },
  { collection: "transactions" }
);
const Transaction = mongoose.model("Transaction", TransactionSchema);
export default Transaction;