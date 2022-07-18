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
  type OrderProduct = Order & {
    products: Product[]
  }
  //logic of method
  describe('This will test logic of order model', () => {
    const order = {
      order_status: 'active',
      user_id: '',
      products: []
    } as OrderProduct

    const product = {
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
      user.id = createUser.id
      order.user_id = user.id
    })

    afterAll(async () => {
      const connection = await db.connect()
      //sql
      const sql = 'DELETE FROM orders'
      //   const sqlProduct = 'DELETE FROM p_order'
      await connection.query(sql)
      //   await connection.query(sqlProduct)
      connection.release()
    })

    //so now database prepared
    it('getCurrentOrderByUserId method should return a new list of orders that related to user id', async () => {
      //to make order should we have some products
      const createdProduct = await productModel.create(product)
      order.products.push(createdProduct)
      //get id of created order
      const createdOrder = await orderModel.create(order)
      order.order_id = createdOrder.order_id
      const ordersList = await orderModel.getCurrentOrderByUserId(user.id as unknown as string)
      expect(ordersList.length).toBe(1)
    })
  })
})
