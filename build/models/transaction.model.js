"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var TransactionSchema = new mongoose_1.default.Schema({
    sender: { type: String, required: false, unique: false },
    receiver: { type: String, required: false },
    amount: { type: String, required: false },
    timestamp: { type: String, required: false },
    status: { type: String, required: false },
}, { collection: "transactions" });
var Transaction = mongoose_1.default.model("Transaction", TransactionSchema);
exports.default = Transaction;
