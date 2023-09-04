import express, { Request, Response } from "express";
import paymentController from "../controller/paymentController";
import authController from "../controller/authController";
var router = express.Router();

router.post("/send-money", paymentController.initializePayment);
router.post("/receive-money", paymentController.completePayment);
router.get("/ongoing-nfc", paymentController.getNearbyPayments);
router.post("/get-transactions", paymentController.getTransactionHistory);
router.post("/login", authController.loginUser);
router.post("/register", authController.registerUser);
// router.post('/send-money')
export default router;
