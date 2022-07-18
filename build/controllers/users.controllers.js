"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
        while (_) try {
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
exports.authenticateUser = exports.deleteUser = exports.updateSpecificUser = exports.getSpecificUser = exports.getAllUser = exports.create = void 0;
var user_model_1 = __importDefault(require("../models/user.model"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var config_1 = __importDefault(require("../config"));
//so user model this class so we need to create instance
//now we have user model
var userModel = new user_model_1.default();
var create = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, first_name, last_name, password, user, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, email = _a.email, first_name = _a.first_name, last_name = _a.last_name, password = _a.password;
                return [4 /*yield*/, userModel.create({ email: email, first_name: first_name, last_name: last_name, password: password })];
            case 1:
                user = _b.sent();
                res.json({
                    status: 200,
                    //we user spread operator to copy a full object
                    data: __assign({}, user),
                    message: 'user created successfully'
                });
                return [3 /*break*/, 3];
            case 2:
                err_1 = _b.sent();
                next(err_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.create = create;
//getAllUser
var getAllUser = function (_, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var users, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, userModel.getAllUser()];
            case 1:
                users = _a.sent();
                res.json({
                    status: 200,
                    data: users,
                    message: 'retrieved succ'
                });
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                next(err_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAllUser = getAllUser;
//getSpecificUser
var getSpecificUser = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var users, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, userModel.getSpecificUser(req.params.id)];
            case 1:
                users = _a.sent();
                res.json({
                    status: 'sucess',
                    data: users,
                    message: 'retrieved succ'
                });
                return [3 /*break*/, 3];
            case 2:
                err_3 = _a.sent();
                next(err_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getSpecificUser = getSpecificUser;
//updateSpecificUser
var updateSpecificUser = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var updatedUser, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, userModel.updateUser(req.body)];
            case 1:
                updatedUser = _a.sent();
                res.json({
                    status: 200,
                    data: updatedUser,
                    message: 'retrieved succ'
                });
                return [3 /*break*/, 3];
            case 2:
                err_4 = _a.sent();
                next(err_4);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.updateSpecificUser = updateSpecificUser;
//delete user
var deleteUser = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userDeleted, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, userModel.deleteUser(req.params.id)];
            case 1:
                userDeleted = _a.sent();
                res.json({
                    status: 200,
                    data: userDeleted,
                    message: 'delete succ'
                });
                return [3 /*break*/, 3];
            case 2:
                err_5 = _a.sent();
                next(err_5);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.deleteUser = deleteUser;
//authenticate user
var authenticateUser = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, userauthenticated, token, err_6;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, email = _a.email, password = _a.password;
                return [4 /*yield*/, userModel.authenticate(email, password)];
            case 1:
                userauthenticated = _b.sent();
                token = jsonwebtoken_1.default.sign({ userauthenticated: userauthenticated }, config_1.default.tokenSecret);
                if (!userauthenticated) {
                    return [2 /*return*/, res.status(401).json({
                            status: 'error',
                            message: 'the username and password do not match'
                        })];
                }
                return [2 /*return*/, res.status(200).json({
                        status: 'success',
                        data: __assign(__assign({}, userauthenticated), { token: token }),
                        message: 'user authenticated '
                    })];
            case 2:
                err_6 = _b.sent();
                next(err_6);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.authenticateUser = authenticateUser;
