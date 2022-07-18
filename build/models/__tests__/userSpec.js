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
var user_model_1 = __importDefault(require("../user.model"));
var database_1 = __importDefault(require("../../database"));
var userModel = new user_model_1.default();
describe('This Suit will test the user Model Functionality', function () {
    //to be define or existing
    describe('This will test existing methode', function () {
        it('should have an methode that get all users', function () {
            expect(userModel.getAllUser).toBeDefined();
        });
        it('should have an methode that get specific user ', function () {
            expect(userModel.getSpecificUser).toBeDefined();
        });
        it('should have an methode that update specific user ', function () {
            expect(userModel.updateUser).toBeDefined();
        });
        it('should have an methode that delete specific user ', function () {
            expect(userModel.deleteUser).toBeDefined();
        });
        it('should have an methode that create specific user ', function () {
            expect(userModel.create).toBeDefined();
        });
        it('should have an methode that authenticate user ', function () {
            expect(userModel.authenticate).toBeDefined();
        });
    });
    //logic of method
    describe('This will test logic of user model', function () {
        var user = {
            email: 'test@gmail.com',
            first_name: 'mohamed',
            last_name: 'nasser',
            password: '12313'
        };
        beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
            var createUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userModel.create(user)];
                    case 1:
                        createUser = _a.sent();
                        user.id = createUser.id;
                        return [2 /*return*/];
                }
            });
        }); });
        afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
            var connection, sql;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1.default.connect()
                        //sql
                    ];
                    case 1:
                        connection = _a.sent();
                        sql = 'DELETE FROM users';
                        return [4 /*yield*/, connection.query(sql)];
                    case 2:
                        _a.sent();
                        connection.release();
                        return [2 /*return*/];
                }
            });
        }); });
        //so now database prepared
        it('create method should return a new user', function () { return __awaiter(void 0, void 0, void 0, function () {
            var createdUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userModel.create({
                            first_name: 'mohamed',
                            last_name: 'nasser',
                            email: 'test@gmail.com',
                            password: '12311'
                        })];
                    case 1:
                        createdUser = _a.sent();
                        expect(createdUser).toEqual({
                            id: createdUser.id,
                            first_name: 'mohamed',
                            last_name: 'nasser',
                            email: 'test@gmail.com'
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it('get all user should return all users from DB', function () { return __awaiter(void 0, void 0, void 0, function () {
            var users;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userModel.getAllUser()];
                    case 1:
                        users = _a.sent();
                        expect(users.length).toBe(3);
                        return [2 /*return*/];
                }
            });
        }); });
        it('get specific user by id', function () { return __awaiter(void 0, void 0, void 0, function () {
            var returnedUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userModel.getSpecificUser(user.id)];
                    case 1:
                        returnedUser = _a.sent();
                        expect(returnedUser.id).toBe(user.id);
                        expect(returnedUser.first_name).toBe(user.first_name);
                        expect(returnedUser.last_name).toBe(user.last_name);
                        expect(returnedUser.email).toBe(user.email);
                        return [2 /*return*/];
                }
            });
        }); });
        it('update method should return a user with updated value', function () { return __awaiter(void 0, void 0, void 0, function () {
            var updatedUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userModel.updateUser(__assign(__assign({}, user), { first_name: 'karim', last_name: 'abdo', email: 'karim@gmail.com' }))];
                    case 1:
                        updatedUser = _a.sent();
                        expect(updatedUser.id).toBe(user.id);
                        expect(updatedUser.first_name).toBe('karim');
                        expect(updatedUser.last_name).toBe('abdo');
                        expect(updatedUser.email).toBe('karim@gmail.com');
                        return [2 /*return*/];
                }
            });
        }); });
        it('delete method should return deleted user', function () { return __awaiter(void 0, void 0, void 0, function () {
            var deletedUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userModel.deleteUser(user.id)];
                    case 1:
                        deletedUser = _a.sent();
                        expect(deletedUser.id).toBe(user.id);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
