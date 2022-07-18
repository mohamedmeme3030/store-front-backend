import Product from '../../types/product.type'
import supertest from 'supertest'
import db from '../../database'
import ProductModel from '../../models/product.model'
import app from '../../index'
import User from '../../types/user.type'
import UserModel from '../../models/user.model'

//create instance of user model
const productModel = new ProductModel()
const userModel = new UserModel()
const request = supertest(app)
let token = ''
describe('This Suit will test Product Api Endpoints', () => {
  const product = {
    name: 'test',
    price: '100',
    category: 'AA'
  } as Product

  const user = {
    email: 'test@gmail.com',
    first_name: 'mohamed',
    last_name: 'nasser',
    password: '12313'
  } as User

  beforeAll(async () => {
    const createUser = await userModel.create(user)
    const createdProduct = await productModel.create(product)
    product.id = createdProduct.id
    user.id = createUser.id
  })

  afterAll(async () => {
    const connection = await db.connect()
    //sql
    const sql = 'DELETE  FROM product'
    const sqlUser = 'DELETE FROM users'
    try {
      await connection.query(sqlUser)
      await connection.query(sql)
    } catch (err) {
      throw new Error('somthing wrong happen')
    } finally {
      connection.release()
    }
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

  describe('This Suit will test CRUD operation Of Product', () => {
    it('test create new product', async () => {
      const res = await request
        .post('/api/product/create')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)

        .send({
          name: 'test2',
          price: '20',
          category: 'BB'
        } as Product)

      expect(res.status).toBe(200)
      const { name, price, category } = res.body.data
      expect(name).toBe('test2')
      expect(price).toBe('20')
      expect(category).toBe('BB')
    })

    it('test get all products ', async () => {
      const res = await request
        .get('/api/product/index')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)

      expect(res.status).toBe(200)
      expect(res.body.data.length).toBe(2)
    })
  })
})
