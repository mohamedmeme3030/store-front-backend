"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var users_routes_1 = __importDefault(require("./api/users.routes"));
var order_routes_1 = __importDefault(require("./api/order.routes"));
var product_routes_1 = __importDefault(require("./api/product.routes"));
//invoke express()
var routes = (0, express_1.default)();
//use some routes
routes.use('/users', users_routes_1.default);
routes.use('/order', order_routes_1.default);
routes.use('/product', product_routes_1.default);
exports.default = routes;
