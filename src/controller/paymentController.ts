import { Request, Response } from "express";
import * as dotenv from "dotenv";
import axios from "axios";
import NFCQueue from "../models/nfcQueue,model";
import Transaction from "../models/transaction.model";

dotenv.config();

const initializePayment = async (req: Request, res: Response, next: any) => {
  const { sender, amount, timestamp } = req.body;
  console.log(sender, amount, timestamp);
  try {
    const response = await NFCQueue.create({
      sender: sender,
      amount: amount,
      timestamp: timestamp,
      status: "Pending",
    });
    console.log("Looking for NFC receiver ", response);
  } catch (error: any) {
    return res.json({ status: "error", error: "Cant Process Transaction" });
  }

  res.send({ message: "Suup Boii!!" });
};

const getNearbyPayments = async (req: Request, res: Response, next: any) => {
  const pendingPayment = await NFCQueue.findOne({
    status: "Pending",
  });
  console.log("Pending :", pendingPayment);
  res.send({ nfc_request: pendingPayment });
};

const completePayment = async (req: Request, res: Response, next: any) => {
  const {receiver} = req.body
  const pendingPayment = await NFCQueue.findOne({
    status: "Pending",
  });
  console.log("Pending :", pendingPayment);
  if (pendingPayment) {
    try {
      const response = await Transaction.create({
        sender: pendingPayment.sender,
        receiver: receiver,
        amount: pendingPayment.amount,
        timestamp: pendingPayment.timestamp,
        status: "Complete",
      });
     await NFCQueue.findOneAndDelete({ status: "Pending" });
      console.log("Transaction Complete ", response);
    } catch (error: any) {
      return res.json({
        status: "error",
        error: error,
      });
    }
  }

  res.send({ message: "No NFC Payment detected" });
};

const getTransactionHistory = async (
  req: Request,
  res: Response,
  next: any
) => {
  const { username } = req.body;
  const transactions = await Transaction.find({
    // sender: username
    $or: [
      { sender: username },
      { receiver: username },
    ],
  },function (err, docs) {
    if (err){
        console.log(err);
    }
    else{
        console.log("transactions :", docs);
        return docs
    }
}).exec();
  console.log("username :", username);
  console.log("transactions res:", transactions);
  res.send({ transactions: transactions });
};

export default {
  initializePayment,
  getNearbyPayments,
  completePayment,
  getTransactionHistory,
};
