import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import config from '../config'
import Error from '../interface/error.interface'

const handleUnauthorizedError = (next: NextFunction) => {
  const error: Error = new Error('not authorized')
  error.status = 401
  next(error)
}
const validateToken = (req: Request, res: Response, middlFunction: NextFunction) => {
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
    const authHeader = req.get('Authorization')

    if (authHeader) {
      //get the bearer
      const bearer: string = authHeader.split(' ')[0].toLowerCase()
      //get the token of the user
      const token = authHeader.split(' ')[1]

      if (token && bearer === 'bearer') {
        //need to decode this token

        const decode = jwt.verify(token, config.tokenSecret as unknown as string)
        if (decode) {
          middlFunction()
        } else {
          handleUnauthorizedError(middlFunction)
        }
      } else {
        handleUnauthorizedError(middlFunction)
      }
    } else {
      handleUnauthorizedError(middlFunction)
    }
  } catch (err) {
    handleUnauthorizedError(middlFunction)
  }
}
export default validateToken
