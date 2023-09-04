"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var paymentController_1 = __importDefault(require("../controller/paymentController"));
var authController_1 = __importDefault(require("../controller/authController"));
var router = express_1.default.Router();
router.post("/send-money", paymentController_1.default.initializePayment);
router.post("/receive-money", paymentController_1.default.completePayment);
router.get("/ongoing-nfc", paymentController_1.default.getNearbyPayments);
router.post("/get-transactions", paymentController_1.default.getTransactionHistory);
router.post("/login", authController_1.default.loginUser);
router.post("/register", authController_1.default.registerUser);
// router.post('/send-money')
exports.default = router;
