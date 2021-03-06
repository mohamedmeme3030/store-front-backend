import OrderModel from '../order.model'
import UserModel from '../user.model'
import ProductModel from '../product.model'
import Order from '../../types/order.type'
import Product from '../../types/product.type'
import db from '../../database'
import User from '../../types/user.type'

const orderModel = new OrderModel()
const userModel = new UserModel()
const productModel = new ProductModel()
describe('This Suit will test the order Model Functionality', () => {
  //to be define or existing
  describe('This will test existing methode', () => {
    it('should have an method that get all orders by user id', () => {
      expect(orderModel.getCurrentOrderByUserId).toBeDefined()
    })
  })

  //logic of method
  describe('This will test logic of order model', () => {
    const order = {
      order_status: 'Active',
      user_id: '',
      products: []
    } as Order

    const productOne = {
      name: 'test',
      price: '1',
      category: 'ghg',
      quantity: 1
    } as Product
    const productTow = {
      name: 'test',
      price: '1',
      category: 'ghg',
      quantity: 1
    } as Product
    const user = {
      email: 'test@gmail.com',
      first_name: 'mohamed',
      last_name: 'nasser',
      password: '12313'
    } as User

    beforeAll(async () => {
      //befor we create should exist user to make it
      const createUser = await userModel.create(user)
      //create user
      user.id = createUser.id
      order.user_id = user.id
      //create products
      const createdProduct = await productModel.create(productOne)
      productOne.id = createdProduct.id
      const createdProductTow = await productModel.create(productTow)
      productTow.id = createdProductTow.id

      order.products = []

      //create order
      const createdOrder = await orderModel.create(order)
      order.order_id = createdOrder.order_id
      //add products to order
      const addedProduct = await orderModel.addProduct(
        2,
        order.order_id as unknown as string,
        productOne.id as unknown as string
      )
      expect(addedProduct.o_id).toBe(order.order_id as unknown as string)
      const addedProductTow = await orderModel.addProduct(
        3,
        order.order_id as unknown as string,
        productTow.id as unknown as string
      )
      expect(addedProductTow.o_id).toBe(order.order_id as unknown as string)
    })

    afterAll(async () => {
      const connection = await db.connect()
      //sql
      const sql =
        'DELETE FROM p_order;\n DELETE FROM product;\n DELETE FROM orders; \n DELETE FROM users;'
      //   const sqlProduct = 'DELETE FROM p_order'
      await connection.query(sql)
      //   await connection.query(sqlProduct)
      connection.release()
    })

    //so now database prepared
    it('getCurrentOrderByUserId method should return a new list of orders that related to user id', async () => {
      const ordersList = await orderModel.getCurrentOrderByUserId(user.id as unknown as string)
      expect(ordersList[0].order_id).toBe(order.order_id)
      expect(ordersList[0].products?.length).toBe(2)
      expect(ordersList.length).toBe(1)
    })
  })
})
