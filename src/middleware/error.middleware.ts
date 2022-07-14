import { Response, Request, NextFunction } from 'express'
import Error from '../interface/error.interface'
const errorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || 500
  const message = err.message || 'this not valid'
  res.status(status).json({
    message,
    status
  })
}

export default errorMiddleware
