import UserModel from '../user.model'
import User from '../../types/user.type'
import db from '../../database'

const userModel = new UserModel()

describe('This suit tests the Authentication Module', () => {
  describe('This will test authenticate method', () => {
    it('This will validate found authenticated user', () => {
      expect(userModel.authenticate).toBeDefined()
    })
  })
})

describe('This suite will test Authentication Logic', () => {
  const user = {
    email: 'test@gmail.com',
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
    const sql = 'DELETE FROM users'
    await connection.query(sql)
    connection.release()
  })

  it('Authenticate methode should return the authenticated user', async () => {
    const authenticatedUser = await userModel.authenticate(user.email, user.password as string)
    expect(authenticatedUser?.email).toBe(user.email)
    expect(authenticatedUser?.first_name).toBe(user.first_name)
    expect(authenticatedUser?.last_name).toBe(user.last_name)
  })

  it('Authenticate methode should return null for wrong credentails', async () => {
    const authenticatedUser = await userModel.authenticate('mohamed@gmail.coma', '1231')
    expect(authenticatedUser).toBe(null)
  })
})
