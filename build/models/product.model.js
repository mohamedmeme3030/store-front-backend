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
var database_1 = __importDefault(require("../database"));
var ProductModel = /** @class */ (function () {
    function ProductModel() {
    }
    //get all products
    ProductModel.prototype.indexProduct = function () {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, result, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        connection = undefined;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, 5, 6]);
                        return [4 /*yield*/, database_1.default.connect()
                            //sql query
                        ];
                    case 2:
                        //open connection with DB
                        connection = _a.sent();
                        sql = "SELECT id, name, price, category FROM product";
                        return [4 /*yield*/, connection.query(sql)
                            //return the result
                        ];
                    case 3:
                        result = _a.sent();
                        //return the result
                        return [2 /*return*/, result.rows];
                    case 4:
                        err_1 = _a.sent();
                        // throw new Error(`Unable to get all user: ${(err as Error).name}`)
                        throw new Error("Unable to get all products: ".concat(err_1.stack));
                    case 5:
                        connection === null || connection === void 0 ? void 0 : connection.release();
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    //show Specific Product
    ProductModel.prototype.showSpecificProduct = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, result, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        connection = undefined;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, 5, 6]);
                        return [4 /*yield*/, database_1.default.connect()
                            //sql query
                        ];
                    case 2:
                        //open connection with DB
                        connection = _a.sent();
                        sql = "SELECT id, name, price, category FROM product WHERE id=($1) ";
                        return [4 /*yield*/, connection.query(sql, [id])
                            //return the result
                        ];
                    case 3:
                        result = _a.sent();
                        //return the result
                        return [2 /*return*/, result.rows[0]];
                    case 4:
                        err_2 = _a.sent();
                        throw new Error("Unable to show product: ".concat(err_2.message));
                    case 5:
                        connection === null || connection === void 0 ? void 0 : connection.release();
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    //create new product
    ProductModel.prototype.create = function (product) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        connection = undefined;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, 5, 6]);
                        return [4 /*yield*/, database_1.default.connect()
                            //sql query
                        ];
                    case 2:
                        //open connection with DB
                        connection = _a.sent();
                        sql = "INSERT INTO product (name, price, category) \n          VALUES ($1,$2,$3) returning id, name, price, category ";
                        return [4 /*yield*/, connection.query(sql, [product.name, product.price, product.category])
                            //return created product
                        ];
                    case 3:
                        result = _a.sent();
                        //return created product
                        return [2 /*return*/, result.rows[0]];
                    case 4:
                        error_1 = _a.sent();
                        throw new Error("Unable to create product (".concat(product.name, "): ").concat(error_1.message));
                    case 5:
                        //after query release the connection
                        connection === null || connection === void 0 ? void 0 : connection.release();
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    //delete product
    ProductModel.prototype.deleteProduct = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, result, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        connection = undefined;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, 5, 6]);
                        return [4 /*yield*/, database_1.default.connect()
                            //sql query
                        ];
                    case 2:
                        //open connection with DB
                        connection = _a.sent();
                        sql = "DELETE FROM product WHERE id=($1) \n                  \n                     RETURNING name, price, category";
                        return [4 /*yield*/, connection.query(sql, [id])
                            //return the result
                        ];
                    case 3:
                        result = _a.sent();
                        //return the result
                        return [2 /*return*/, result.rows[0]];
                    case 4:
                        err_3 = _a.sent();
                        throw new Error("Unable to delete product: ".concat(err_3.message));
                    case 5:
                        //release connection
                        connection === null || connection === void 0 ? void 0 : connection.release();
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    ProductModel.prototype.updateProduct = function (product) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, result, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        connection = undefined;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, database_1.default.connect()
                            //write aql
                        ];
                    case 2:
                        //open connection
                        connection = _a.sent();
                        sql = "UPDATE product SET name=$1, price=$2, category=$3\n                  WHERE id=$4\n                  RETURNING name, price, category";
                        return [4 /*yield*/, connection.query(sql, [
                                product.name,
                                product.price,
                                product.category,
                                product.id
                            ])
                            //get the result
                        ];
                    case 3:
                        result = _a.sent();
                        //get the result
                        return [2 /*return*/, result.rows[0]];
                    case 4:
                        err_4 = _a.sent();
                        throw new Error('not able to update');
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return ProductModel;
}());
exports.default = ProductModel;
