import mongoose from "mongoose";
const NFCQueueSchema = new mongoose.Schema(
  {
    sender: { type: String, required: false, unique: true },
    // receiver: { type: String, required: true },
    amount: { type: String, required: false },
    timestamp: { type: String, required: false },
    status: { type: String, required: false },
  },
  { collection: "NFCQueues" }
);
const NFCQueue = mongoose.model("NFCQueue", NFCQueueSchema);
export default NFCQueue;