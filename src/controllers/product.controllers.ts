import { NextFunction, Request, Response } from 'express'
import ProductModel from '../models/product.model'

const productModel = new ProductModel()
export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const createdProduct = await productModel.create(req.body)
    res.json({
      status: 'success',
      //we user spread operator to copy a full object
      data: { ...createdProduct },
      message: 'product created successfully'
    })
  } catch (err) {
    next(err)
  }
}
//update
export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updated = await productModel.updateProduct(req.body)
    res.json({
      status: 'success',
      data: { ...updated },
      message: 'updated product success'
    })
  } catch (err) {
    next(err)
  }
}
//index
export const index = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const indexResult = await productModel.indexProduct()
    res.json({
      status: 'success',
      data: { ...indexResult },
      message: 'index success'
    })
  } catch (err) {
    next(err)
  }
}

//getSpecificProduct
export const getProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updatedUser = await productModel.showSpecificProduct(req.query['id'] as unknown as string)
    res.json({
      status: 'sucess',
      data: updatedUser,
      message: 'retrieved succ'
    })
  } catch (err) {
    next(err)
  }
}

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deletedProduct = await productModel.deleteProduct(req.query['id'] as unknown as string)
    res.json({
      status: 'success',
      data: { ...deletedProduct },
      message: 'delete product is success'
    })
  } catch (err) {
    next(err)
  }
}
