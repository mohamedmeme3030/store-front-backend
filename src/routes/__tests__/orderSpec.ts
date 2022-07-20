import OrderModel from '../../models/order.model'
import UserModel from '../../models/user.model'
import ProductModel from '../../models/product.model'
import Order from '../../types/order.type'
import Product from '../../types/product.type'
import db from '../../database'
import User from '../../types/user.type'
import supertest from 'supertest'
import app from '../../index'
const request = supertest(app)
let token = ''
const orderModel = new OrderModel()
const userModel = new UserModel()
const productModel = new ProductModel()
describe('This Suit will test the Order API Endpoint', () => {
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
      // order.products.push(addedProduct.p_id as unknown as string)

      // order.products?.push(addedProduct.p_id)
      const addedProductTow = await orderModel.addProduct(
        3,
        order.order_id as unknown as string,
        productTow.id as unknown as string
      )
      expect(addedProductTow.o_id).toBe(order.order_id as unknown as string)

      // order.products.push(addedProductTow.p_id as unknown as string)
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

    describe('This Sub Suit will test authenticate method', () => {
      it('test the authenticate endpoint to get token', async () => {
        const res = await request
          .post('/api/users/authenticate')
          .set('Content-type', 'application/json')
          .send({ email: 'test@gmail.com', password: '12313' })

        expect(res.status).toBe(200)
        const { id, email, token: userToken } = res.body.data
        expect(id).toBe(user.id)
        expect(email).toBe('test@gmail.com')
        token = userToken
      })

      it('test the authenticate endpoint with wrong credentials', async () => {
        const res = await request
          .post('/api/users/authenticate')
          .set('Content-type', 'application/json')
          .send({ email: 'tt@gmail.com', password: '12313' })

        expect(res.status).toBe(401)
      })
    })

    //so now database prepared
    describe('This Suit will test logic operation Of Order', async () => {
      it('test get current Order By UserId ', async () => {
        const res = await request
          .get(`/api/order/currentOrderByUserId/${user.id}`)
          .set('Content-type', 'application/json')
          .set('Authorization', `Bearer ${token}`)

        expect(res.status).toBe(200)
        expect(res.body.data[0].order_id).toBe(order.order_id)
        expect(res.body.data[0].products.length).toBe(2)
        expect(res.body.data.length).toBe(1)
      })
    })
  })
})
