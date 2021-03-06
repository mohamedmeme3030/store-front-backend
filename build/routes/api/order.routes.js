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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var controllers = __importStar(require("../../controllers/order.controllers"));
var athentication_middleware_1 = __importDefault(require("../../middleware/athentication.middleware"));
var routes = (0, express_1.Router)();
//order routing
//first we validate that user is authorized
//after that we can make order
routes.route('/create').post(athentication_middleware_1.default, controllers.create);
routes.route('/index').get(athentication_middleware_1.default, controllers.index);
routes.route('/delete/:id').delete(athentication_middleware_1.default, controllers.deleteOrder);
routes.route('/:id/products').post(athentication_middleware_1.default, controllers.addProduct);
routes.route('/currentOrderByUserId/:id').get(athentication_middleware_1.default, controllers.getCurrentOrderByUserId);
exports.default = routes;
