import UserModel from '../user.model'
import User from '../../types/user.type'
import db from '../../database'

const userModel = new UserModel()
describe('This Suit will test the user Model Functionality', () => {
  //to be define or existing
  describe('This will test existing methode', () => {
    it('should have an methode that get all users', () => {
      expect(userModel.getAllUser).toBeDefined()
    })

    it('should have an methode that get specific user ', () => {
      expect(userModel.getSpecificUser).toBeDefined()
    })

    it('should have an methode that update specific user ', () => {
      expect(userModel.updateUser).toBeDefined()
    })

    it('should have an methode that delete specific user ', () => {
      expect(userModel.deleteUser).toBeDefined()
    })

    it('should have an methode that create specific user ', () => {
      expect(userModel.create).toBeDefined()
    })

    it('should have an methode that authenticate user ', () => {
      expect(userModel.authenticate).toBeDefined()
    })
  })
  //logic of method
  describe('This will test logic of user model', () => {
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

    //so now database prepared
    it('create method should return a new user', async () => {
      const createdUser = await userModel.create({
        first_name: 'mohamed',
        last_name: 'nasser',
        email: 'test@gmail.com',
        password: '12311'
      } as User)
      expect(createdUser).toEqual({
        id: createdUser.id,
        first_name: 'mohamed',
        last_name: 'nasser',
        email: 'test@gmail.com'
      } as User)
    })

    it('get all user should return all users from DB', async () => {
      const users = await userModel.getAllUser()
      expect(users.length).toBe(2)
    })

    it('get specific user by id', async () => {
      const returnedUser = await userModel.getSpecificUser(user.id as string)
      expect(returnedUser.id).toBe(user.id)
      expect(returnedUser.first_name).toBe(user.first_name)
      expect(returnedUser.last_name).toBe(user.last_name)
      expect(returnedUser.email).toBe(user.email)
    })

    it('update method should return a user with updated value', async () => {
      const updatedUser = await userModel.updateUser({
        ...user,
        first_name: 'karim',
        last_name: 'abdo',
        email: 'karim@gmail.com'
      })
      expect(updatedUser.id).toBe(user.id)
      expect(updatedUser.first_name).toBe('karim')
      expect(updatedUser.last_name).toBe('abdo')
      expect(updatedUser.email).toBe('karim@gmail.com')
    })

    it('delete method should return deleted user', async () => {
      const deletedUser = await userModel.deleteUser(user.id as string)
      expect(deletedUser.id).toBe(user.id)
    })
  })
})
