import supertest from 'supertest'
import db from '../../database'
import UserModel from '../../models/user.model'
import User from '../../types/user.type'
import app from '../../index'

//create instance of user model
const userModel = new UserModel()
const request = supertest(app)
let token = ''

describe('This Suit will test User Api Endpoints', () => {
  const user = {
    email: 'testt@gmail.com',
    first_name: 'mohamed',
    last_name: 'nasser',
    password: '12313'
  } as User

  beforeAll(async () => {
    const createUser = await userModel.create(user)
    user.id = createUser.id
  })

  afterAll(async () => {
    const connection = await db.connect()
    //sql
    const sql = 'DELETE  FROM users'
    await connection.query(sql)
    connection.release()
  })
  describe('This Sub Suit will test authenticate method', () => {
    it('test the authenticate endpoint to get token', async () => {
      const res = await request
        .post('/api/users/authenticate')
        .set('Content-type', 'application/json')
        .send({ email: 'testt@gmail.com', password: '12313' })

      expect(res.status).toBe(200)
      const { id, email, token: userToken } = res.body.data
      expect(id).toBe(user.id)
      expect(email).toBe('testt@gmail.com')
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

  describe('This Suit will test CRUD operation', () => {
    it('test create new user', async () => {
      const res = await request
        .post('/api/users/create')
        .set('Content-type', 'application/json')
        .send({
          first_name: 'karim',
          last_name: 'nasser',
          email: 'karim@gmail.com',
          password: '12313'
        } as User)
      expect(res.status).toBe(200)
      const { first_name, last_name, email } = res.body.data
      expect(first_name).toBe('karim')
      expect(last_name).toBe('nasser')
      expect(email).toBe('karim@gmail.com')
    })

    it('test get all user ', async () => {
      const res = await request
        .get('/api/users/index')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
      expect(res.status).toBe(200)
      expect(res.body.data.length).toBe(2)
    })

    it('test get specific user by id', async () => {
      const res = await request
        .get(`/api/users/get/${user.id}`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)

      expect(res.status).toBe(200)
      expect(res.body.data.first_name).toBe('mohamed')
      expect(res.body.data.last_name).toBe('nasser')
      expect(res.body.data.email).toBe('testt@gmail.com')
    })

    it('test update user', async () => {
      //prepar res
      const res = await request
        .patch('/api/users/update')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({ ...user, first_name: 'mm', last_name: 'nn', email: 'mm@gmail.com' } as User)
      //get the response
      const { id, email, first_name, last_name } = res.body.data
      expect(res.status).toBe(200)
      expect(id).toBe(user.id)
      expect(email).toBe('mm@gmail.com')
      expect(first_name).toBe('mm')
      expect(last_name).toBe('nn')
    })
    it('test delete user', async () => {
      const res = await request
        .delete(`/api/users/delete/${user.id}`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)

      expect(res.status).toBe(200)
      expect(res.body.data.first_name).toBe('mm')
      expect(res.body.data.last_name).toBe('nn')
      expect(res.body.data.email).toBe('mm@gmail.com')
    })
  })
})
