"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var NFCQueueSchema = new mongoose_1.default.Schema({
    sender: { type: String, required: false, unique: true },
    // receiver: { type: String, required: true },
    amount: { type: String, required: false },
    timestamp: { type: String, required: false },
    status: { type: String, required: false },
}, { collection: "NFCQueues" });
var NFCQueue = mongoose_1.default.model("NFCQueue", NFCQueueSchema);
exports.default = NFCQueue;
