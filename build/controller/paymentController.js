"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv = __importStar(require("dotenv"));
var nfcQueue_model_1 = __importDefault(require("../models/nfcQueue,model"));
var transaction_model_1 = __importDefault(require("../models/transaction.model"));
dotenv.config();
var initializePayment = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, sender, amount, timestamp, response, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, sender = _a.sender, amount = _a.amount, timestamp = _a.timestamp;
                console.log(sender, amount, timestamp);
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, nfcQueue_model_1.default.create({
                        sender: sender,
                        amount: amount,
                        timestamp: timestamp,
                        status: "Pending",
                    })];
            case 2:
                response = _b.sent();
                console.log("Looking for NFC receiver ", response);
                return [3 /*break*/, 4];
            case 3:
                error_1 = _b.sent();
                // duplicate key
                return [2 /*return*/, res.json({ status: "error", error: "Cant Process Transaction" })];
            case 4:
                res.send({ message: "Suup Boii!!" });
                return [2 /*return*/];
        }
    });
}); };
var getNearbyPayments = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var pendingPayment;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, nfcQueue_model_1.default.findOne({
                    status: "Pending",
                })];
            case 1:
                pendingPayment = _a.sent();
                console.log("Pending :", pendingPayment);
                res.send({ nfc_request: pendingPayment });
                return [2 /*return*/];
        }
    });
}); };
var completePayment = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var receiver, pendingPayment, response, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                receiver = req.body.receiver;
                return [4 /*yield*/, nfcQueue_model_1.default.findOne({
                        status: "Pending",
                    })];
            case 1:
                pendingPayment = _a.sent();
                console.log("Pending :", pendingPayment);
                if (!pendingPayment) return [3 /*break*/, 6];
                _a.label = 2;
            case 2:
                _a.trys.push([2, 5, , 6]);
                return [4 /*yield*/, transaction_model_1.default.create({
                        sender: pendingPayment.sender,
                        receiver: receiver,
                        amount: pendingPayment.amount,
                        timestamp: pendingPayment.timestamp,
                        status: "Complete",
                    })];
            case 3:
                response = _a.sent();
                return [4 /*yield*/, nfcQueue_model_1.default.findOneAndDelete({ status: "Pending" })];
            case 4:
                _a.sent();
                console.log("Transaction Complete ", response);
                return [3 /*break*/, 6];
            case 5:
                error_2 = _a.sent();
                return [2 /*return*/, res.json({
                        status: "error",
                        error: error_2,
                    })];
            case 6:
                res.send({ message: "No NFC Payment detected" });
                return [2 /*return*/];
        }
    });
}); };
var getTransactionHistory = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var username, transactions;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                username = req.body.username;
                return [4 /*yield*/, transaction_model_1.default.find({
                        // sender: username
                        $or: [
                            { sender: username },
                            { receiver: username },
                        ],
                    }, function (err, docs) {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            // console.log("Second function call : ", docs);
                            console.log("transactions :", docs);
                            return docs;
                        }
                    }).exec()];
            case 1:
                transactions = _a.sent();
                console.log("username :", username);
                console.log("transactions res:", transactions);
                res.send({ transactions: transactions });
                return [2 /*return*/];
        }
    });
}); };
exports.default = {
    initializePayment: initializePayment,
    getNearbyPayments: getNearbyPayments,
    completePayment: completePayment,
    getTransactionHistory: getTransactionHistory,
};
