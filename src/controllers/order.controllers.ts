import OrderModel from '../models/order.model'
import { Request, Response, NextFunction } from 'express'

const orderModel = new OrderModel()
export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    //this await function just to wait response of create methode
    const user = await orderModel.create(req.body)
    res.json({
      status: 'success',
      //we user spread operator to copy a full object
      data: { ...user },
      message: 'order created successfully'
    })
  } catch (err) {
    next(err)
  }
}

export const deleteOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orderDeleted = await orderModel.deleteOrder(req.body)
    res.json({
      status: 'sucess',
      data: orderDeleted,
      message: 'delete succ'
    })
  } catch (err) {
    next(err)
  }
}

export const getCurrentOrderByUserId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const currentOrder = await orderModel.getCurrentOrderByUserId(req.params.id)
    res.json({
      status: 'sucess',
      data: currentOrder,
      message: 'get current order succ'
    })
  } catch (err) {
    next(err)
  }
}

export const index = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const indexResult = orderModel.index()
    res.json({
      status: 200,
      data: indexResult,
      message: 'index success'
    })
  } catch (err) {
    next(err)
  }
}
