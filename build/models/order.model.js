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
var OrderModel = /** @class */ (function () {
    function OrderModel() {
    }
    OrderModel.prototype.getCurrentOrderByUserId = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sqlToGetOrderList, result, arrProduct, _i, _a, order, products, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        connection = undefined;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 8, 9, 10]);
                        return [4 /*yield*/, database_1.default.connect()
                            //sql query
                        ];
                    case 2:
                        //open connection with DB
                        connection = _b.sent();
                        sqlToGetOrderList = "SELECT order_id, order_status FROM orders \n       WHERE user_id=$1 ";
                        return [4 /*yield*/, connection.query(sqlToGetOrderList, [id])
                            //array of product
                        ];
                    case 3:
                        result = _b.sent();
                        arrProduct = undefined;
                        _i = 0, _a = result.rows;
                        _b.label = 4;
                    case 4:
                        if (!(_i < _a.length)) return [3 /*break*/, 7];
                        order = _a[_i];
                        return [4 /*yield*/, this.getProductsOfOrder(order.order_id)];
                    case 5:
                        products = _b.sent();
                        arrProduct = products;
                        _b.label = 6;
                    case 6:
                        _i++;
                        return [3 /*break*/, 4];
                    case 7: 
                    //return created user
                    return [2 /*return*/, result.rows];
                    case 8:
                        error_1 = _b.sent();
                        throw new Error("Unable to get Order : ".concat(error_1.message));
                    case 9:
                        //after query release the connection
                        connection === null || connection === void 0 ? void 0 : connection.release();
                        return [7 /*endfinally*/];
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    //get all products of specific order
    OrderModel.prototype.getProductsOfOrder = function (orderId) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sqlToGetProducts, result, err_1;
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
                        sqlToGetProducts = "SELECT  \n      product.name, product.price, product.category\n      p_order.quantity \n      FROM product INNER JOIN p_order ON product.id = p_order.p_id\n      WHERE user_id=$1 ";
                        return [4 /*yield*/, connection.query(sqlToGetProducts, [orderId])];
                    case 3:
                        result = _a.sent();
                        return [2 /*return*/, result.rows];
                    case 4:
                        err_1 = _a.sent();
                        throw new Error("Unable to get Order : ".concat(err_1.message));
                    case 5:
                        //after query release the connection
                        connection === null || connection === void 0 ? void 0 : connection.release();
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    //create new
    OrderModel.prototype.create = function (order) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sqlInsertBasicOrderInfo, resultInsertBasicOrderInfo, sqlOrderProduct, productArr, resultProductOrder, _i, _a, product, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        connection = undefined;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 8, 9, 10]);
                        return [4 /*yield*/, database_1.default.connect()
                            //sql query to insert into basic order info(user_id, status)
                        ];
                    case 2:
                        //open connection with DB
                        connection = _b.sent();
                        sqlInsertBasicOrderInfo = "INSERT INTO orders (user_id, order_status) \n      VALUES ($1,$2) returning user_id, order_status, order_id ";
                        return [4 /*yield*/, connection.query(sqlInsertBasicOrderInfo, [
                                order.user_id,
                                order.order_status
                            ])];
                    case 3:
                        resultInsertBasicOrderInfo = _b.sent();
                        if (resultInsertBasicOrderInfo.rowCount === 0)
                            throw new Error("not able to create order");
                        sqlOrderProduct = "INSERT INTO p_order (p_id, o_id, quantity)\n                               VALUES ($1,$2,$3) returning *";
                        productArr = [];
                        resultProductOrder = undefined;
                        _i = 0, _a = order.products;
                        _b.label = 4;
                    case 4:
                        if (!(_i < _a.length)) return [3 /*break*/, 7];
                        product = _a[_i];
                        return [4 /*yield*/, connection.query(sqlOrderProduct, [
                                product.id,
                                resultInsertBasicOrderInfo.rows[0].order_id,
                                product.quantity
                            ])
                            //push this current product to arr
                        ];
                    case 5:
                        //run query that insert into order_product
                        resultProductOrder = _b.sent();
                        //push this current product to arr
                        productArr.push(resultProductOrder.rows[0]);
                        _b.label = 6;
                    case 6:
                        _i++;
                        return [3 /*break*/, 4];
                    case 7: 
                    //return created user
                    return [2 /*return*/, order];
                    case 8:
                        error_2 = _b.sent();
                        throw new Error("Unable to create Order : ".concat(error_2.message));
                    case 9:
                        //after query release the connection
                        connection === null || connection === void 0 ? void 0 : connection.release();
                        return [7 /*endfinally*/];
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    OrderModel.prototype.index = function () {
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
                            //write sql
                        ];
                    case 2:
                        //open connection
                        connection = _a.sent();
                        sql = "SELECT * FROM orders";
                        return [4 /*yield*/, connection.query(sql)
                            //get the result
                        ];
                    case 3:
                        result = _a.sent();
                        //get the result
                        return [2 /*return*/, result.rows];
                    case 4:
                        err_2 = _a.sent();
                        throw new Error('somthing wrong happened in server');
                    case 5:
                        connection === null || connection === void 0 ? void 0 : connection.release;
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    //delete user
    OrderModel.prototype.deleteOrder = function (order) {
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
                        sql = "DELETE FROM orders WHERE user_id=($1) \n                     \n                     RETURNING order_id, user_id";
                        return [4 /*yield*/, connection.query(sql, [order.user_id])
                            //return the result
                        ];
                    case 3:
                        result = _a.sent();
                        //return the result
                        return [2 /*return*/, result.rows[0]];
                    case 4:
                        err_3 = _a.sent();
                        throw new Error("Unable to delete order: ".concat(err_3.message));
                    case 5:
                        //release connection
                        connection === null || connection === void 0 ? void 0 : connection.release;
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return OrderModel;
}());
exports.default = OrderModel;
