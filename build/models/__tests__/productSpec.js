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
var product_model_1 = __importDefault(require("../product.model"));
var database_1 = __importDefault(require("../../database"));
var productModel = new product_model_1.default();
describe('This Suit will test the product Model Functionality', function () {
    //to be define or existing
    describe('This will test existing methode', function () {
        it('should have an methode that get all products', function () {
            expect(productModel.indexProduct).toBeDefined();
        });
        it('should have an methode that get specific product ', function () {
            expect(productModel.showSpecificProduct).toBeDefined();
        });
        it('should have an methode that update specific product ', function () {
            expect(productModel.updateProduct).toBeDefined();
        });
        it('should have an methode that delete specific product ', function () {
            expect(productModel.deleteProduct).toBeDefined();
        });
        it('should have an methode that create new product ', function () {
            expect(productModel.create).toBeDefined();
        });
    });
    //logic of method
    describe('This will test logic of product model', function () {
        var product = {
            name: 'test',
            price: '1',
            category: 'ghg',
            quantity: 2
        };
        beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
            var createProduct;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, productModel.create(product)];
                    case 1:
                        createProduct = _a.sent();
                        product.id = createProduct.id;
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
                        sql = 'DELETE FROM product';
                        return [4 /*yield*/, connection.query(sql)];
                    case 2:
                        _a.sent();
                        connection.release();
                        return [2 /*return*/];
                }
            });
        }); });
        //so now database prepared
        it('create method should return a new product', function () { return __awaiter(void 0, void 0, void 0, function () {
            var createdProduct;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, productModel.create({
                            name: 'test2',
                            price: '10',
                            category: 'aa'
                        })];
                    case 1:
                        createdProduct = _a.sent();
                        expect(createdProduct).toEqual({
                            id: createdProduct.id,
                            name: 'test2',
                            price: '10',
                            category: 'aa'
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it('get all product should return all products from DB', function () { return __awaiter(void 0, void 0, void 0, function () {
            var products;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, productModel.indexProduct()];
                    case 1:
                        products = _a.sent();
                        expect(products.length).toBe(2);
                        return [2 /*return*/];
                }
            });
        }); });
        it('get specific product by id', function () { return __awaiter(void 0, void 0, void 0, function () {
            var returnedProduct;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, productModel.showSpecificProduct(product.id)];
                    case 1:
                        returnedProduct = _a.sent();
                        expect(returnedProduct.id).toBe(product.id);
                        expect(returnedProduct.name).toBe(product.name);
                        expect(returnedProduct.price).toBe(product.price);
                        expect(returnedProduct.category).toBe(product.category);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
