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
var order_model_1 = __importDefault(require("../../models/order.model"));
var user_model_1 = __importDefault(require("../../models/user.model"));
var product_model_1 = __importDefault(require("../../models/product.model"));
var database_1 = __importDefault(require("../../database"));
var supertest_1 = __importDefault(require("supertest"));
var index_1 = __importDefault(require("../../index"));
var request = (0, supertest_1.default)(index_1.default);
var token = '';
var orderModel = new order_model_1.default();
var userModel = new user_model_1.default();
var productModel = new product_model_1.default();
describe('This Suit will test the Order API Endpoint', function () {
    //logic of method
    describe('This will test logic of order model', function () {
        var order = {
            order_status: 'Active',
            user_id: '',
            products: []
        };
        var productOne = {
            name: 'test',
            price: '1',
            category: 'ghg',
            quantity: 1
        };
        var productTow = {
            name: 'test',
            price: '1',
            category: 'ghg',
            quantity: 1
        };
        var user = {
            email: 'test@gmail.com',
            first_name: 'mohamed',
            last_name: 'nasser',
            password: '12313'
        };
        beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
            var createUser, createdProduct, createdProductTow, createdOrder, addedProduct, addedProductTow;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userModel.create(user)
                        //create user
                    ];
                    case 1:
                        createUser = _a.sent();
                        //create user
                        user.id = createUser.id;
                        order.user_id = user.id;
                        return [4 /*yield*/, productModel.create(productOne)];
                    case 2:
                        createdProduct = _a.sent();
                        productOne.id = createdProduct.id;
                        return [4 /*yield*/, productModel.create(productTow)];
                    case 3:
                        createdProductTow = _a.sent();
                        productTow.id = createdProductTow.id;
                        order.products = [];
                        return [4 /*yield*/, orderModel.create(order)];
                    case 4:
                        createdOrder = _a.sent();
                        order.order_id = createdOrder.order_id;
                        return [4 /*yield*/, orderModel.addProduct(2, order.order_id, productOne.id)];
                    case 5:
                        addedProduct = _a.sent();
                        expect(addedProduct.o_id).toBe(order.order_id);
                        return [4 /*yield*/, orderModel.addProduct(3, order.order_id, productTow.id)];
                    case 6:
                        addedProductTow = _a.sent();
                        expect(addedProductTow.o_id).toBe(order.order_id);
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
                        sql = 'DELETE FROM p_order;\n DELETE FROM product;\n DELETE FROM orders; \n DELETE FROM users;';
                        //   const sqlProduct = 'DELETE FROM p_order'
                        return [4 /*yield*/, connection.query(sql)
                            //   await connection.query(sqlProduct)
                        ];
                    case 2:
                        //   const sqlProduct = 'DELETE FROM p_order'
                        _a.sent();
                        //   await connection.query(sqlProduct)
                        connection.release();
                        return [2 /*return*/];
                }
            });
        }); });
        describe('This Sub Suit will test authenticate method', function () {
            it('test the authenticate endpoint to get token', function () { return __awaiter(void 0, void 0, void 0, function () {
                var res, _a, id, email, userToken;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, request
                                .post('/api/users/authenticate')
                                .set('Content-type', 'application/json')
                                .send({ email: 'test@gmail.com', password: '12313' })];
                        case 1:
                            res = _b.sent();
                            expect(res.status).toBe(200);
                            _a = res.body.data, id = _a.id, email = _a.email, userToken = _a.token;
                            expect(id).toBe(user.id);
                            expect(email).toBe('test@gmail.com');
                            token = userToken;
                            return [2 /*return*/];
                    }
                });
            }); });
            it('test the authenticate endpoint with wrong credentials', function () { return __awaiter(void 0, void 0, void 0, function () {
                var res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, request
                                .post('/api/users/authenticate')
                                .set('Content-type', 'application/json')
                                .send({ email: 'tt@gmail.com', password: '12313' })];
                        case 1:
                            res = _a.sent();
                            expect(res.status).toBe(401);
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        //so now database prepared
        describe('This Suit will test logic operation Of Order', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                it('test get current Order By UserId ', function () { return __awaiter(void 0, void 0, void 0, function () {
                    var res;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, request
                                    .get("/api/order/currentOrderByUserId/".concat(user.id))
                                    .set('Content-type', 'application/json')
                                    .set('Authorization', "Bearer ".concat(token))];
                            case 1:
                                res = _a.sent();
                                expect(res.status).toBe(200);
                                expect(res.body.data[0].order_id).toBe(order.order_id);
                                expect(res.body.data[0].products.length).toBe(2);
                                expect(res.body.data.length).toBe(1);
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        }); });
    });
});
