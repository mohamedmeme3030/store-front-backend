import { NextFunction, Request, Response } from 'express'
import UserModel from '../models/user.model'
import jwt from 'jsonwebtoken'
import config from '../config'

//so user model this class so we need to create instance
//now we have user model
const userModel = new UserModel()
export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    //this await function just to wait response of create methode
    const user = await userModel.create(req.body)
    res.json({
      status: 200,
      //we user spread operator to copy a full object
      data: { ...user },
      message: 'user created successfully'
    })
  } catch (err) {
    next(err)
  }
}
//getAllUser
export const getAllUser = async (_: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userModel.getAllUser()
    res.json({
      status: 200,
      data: users,
      message: 'retrieved succ'
    })
  } catch (err) {
    next(err)
  }
}
//getSpecificUser
export const getSpecificUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userModel.getSpecificUser(req.params.id as unknown as string)
    res.json({
      status: 'sucess',
      data: users,
      message: 'retrieved succ'
    })
  } catch (err) {
    next(err)
  }
}
//updateSpecificUser
export const updateSpecificUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updatedUser = await userModel.updateUser(req.body)
    res.json({
      status: 200,
      data: updatedUser,
      message: 'retrieved succ'
    })
  } catch (err) {
    next(err)
  }
}
//delete user
export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userDeleted = await userModel.deleteUser(req.params.id as unknown as string)
    res.json({
      status: 200,
      data: userDeleted,
      message: 'delete succ'
    })
  } catch (err) {
    next(err)
  }
}

//authenticate user
export const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body
    const userauthenticated = await userModel.authenticate(email, password)
    const token = jwt.sign({ userauthenticated }, config.tokenSecret as unknown as string)
    if (!userauthenticated) {
      return res.status(401).json({
        status: 'error',
        message: 'the username and password do not match'
      })
    }
    return res.status(200).json({
      status: 'success',
      data: { ...userauthenticated, token },
      message: 'user authenticated '
    })
  } catch (err) {
    next(err)
  }
}
