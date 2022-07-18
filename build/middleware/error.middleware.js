"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var errorMiddleware = function (err, req, res, next) {
    var status = err.status || 500;
    var message = err.message || 'this not valid';
    res.status(status).json({
        message: message,
        status: status
    });
};
exports.default = errorMiddleware;
