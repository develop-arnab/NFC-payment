"use strict";
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
var bcrypt_1 = __importDefault(require("bcrypt"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var user_model_1 = __importDefault(require("../models/user.model"));
var JWT_SECRET = "sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk";
var loginUser = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, password, user, token;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, username = _a.username, password = _a.password;
                return [4 /*yield*/, user_model_1.default.findOne({
                        username: username,
                    })];
            case 1:
                user = _b.sent();
                if (!user) return [3 /*break*/, 3];
                return [4 /*yield*/, bcrypt_1.default.compare(password, user.password)];
            case 2:
                if (_b.sent()) {
                    token = jsonwebtoken_1.default.sign({
                        id: user._id,
                        username: user.username,
                    }, JWT_SECRET);
                    return [2 /*return*/, res.json({ status: "ok", data: token, username: username })];
                }
                return [3 /*break*/, 4];
            case 3:
                res.json({ status: "error", error: "Invalid username/password" });
                _b.label = 4;
            case 4: return [2 /*return*/];
        }
    });
}); };
var registerUser = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, plainTextPassword, password, response, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, username = _a.username, plainTextPassword = _a.password;
                if (!username || typeof username !== "string") {
                    return [2 /*return*/, res.json({ status: "error", error: "Invalid username" })];
                }
                if (!plainTextPassword || typeof plainTextPassword !== "string") {
                    return [2 /*return*/, res.json({ status: "error", error: "Invalid password" })];
                }
                if (plainTextPassword.length < 5) {
                    return [2 /*return*/, res.json({
                            status: "error",
                            error: "Password too small. Should be atleast 6 characters",
                        })];
                }
                return [4 /*yield*/, bcrypt_1.default.hash(plainTextPassword, 10)];
            case 1:
                password = _b.sent();
                _b.label = 2;
            case 2:
                _b.trys.push([2, 4, , 5]);
                return [4 /*yield*/, user_model_1.default.create({
                        username: username,
                        password: password,
                    })];
            case 3:
                response = _b.sent();
                console.log("User created successfully: ", response);
                return [3 /*break*/, 5];
            case 4:
                error_1 = _b.sent();
                if (error_1.code === 11000) {
                    // duplicate key
                    return [2 /*return*/, res.json({ status: "error", error: "Username already in use" })];
                }
                throw error_1;
            case 5:
                res.json({ status: "ok" });
                return [2 /*return*/];
        }
    });
}); };
exports.default = {
    loginUser: loginUser,
    registerUser: registerUser
};
