"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var config_1 = __importDefault(require("../config"));
var handleUnauthorizedError = function (next) {
    var error = new Error('not authorized');
    error.status = 401;
    next(error);
};
var validateToken = function (req, res, middlFunction) {
    try {
        //get the authHeader
        //check authHeader validate
        //get the value of the token
        //check if it bearer token or not
        //decode based on tokenSecret
        //next()
        //if not valid failed to authenticate user
        //token type not bearer
        //get the auth
        var authHeader = req.get('Authorization');
        if (authHeader) {
            //get the bearer
            var bearer = authHeader.split(' ')[0].toLowerCase();
            //get the token of the user
            var token = authHeader.split(' ')[1];
            if (token && bearer === 'bearer') {
                //need to decode this token
                var decode = jsonwebtoken_1.default.verify(token, config_1.default.tokenSecret);
                if (decode) {
                    middlFunction();
                }
                else {
                    handleUnauthorizedError(middlFunction);
                }
            }
            else {
                handleUnauthorizedError(middlFunction);
            }
        }
        else {
            handleUnauthorizedError(middlFunction);
        }
    }
    catch (err) {
        handleUnauthorizedError(middlFunction);
    }
};
exports.default = validateToken;
