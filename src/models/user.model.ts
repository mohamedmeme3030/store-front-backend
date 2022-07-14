import { PoolClient } from 'pg'
import User from '../types/user.type'
import db from '../database'
import config from '../config'
import bcrypt from 'bcrypt'

//create function that encrypt our pass
const hashPassword = (pass: string) => {
  const salt = parseInt(config.salt as string)
  return bcrypt.hashSync(`${pass}${config.pepper}`, salt)
}
class UserModel {
  //create new
  async create(user: User): Promise<User> {
    let connection: PoolClient | undefined = undefined
    try {
      //open connection with DB
      connection = await db.connect()
      //sql query
      const sql = `INSERT INTO users (first_name, last_name, email, password) 
      VALUES ($1,$2,$3,$4) returning id, email, first_name, last_name `
      // run query
      const result = await connection.query<User>(sql, [
        user.first_name,
        user.last_name,
        user.email,
        hashPassword(user.password)
      ])

      //return created user
      return result.rows[0]
    } catch (error) {
      throw new Error(`Unable to create user (${user.first_name}): ${(error as Error).message}`)
    } finally {
      //after query release the connection
      connection?.release()
    }
  }
  //get all user
  async getAllUser(): Promise<User[]> {
    let connection: PoolClient | undefined = undefined

    try {
      //open connection with DB
      connection = await db.connect()
      //sql query
      const sql = `SELECT id, first_name, last_name, email FROM users`
      // run query
      const result = await connection.query(sql)
      //return the result
      return result.rows
    } catch (err) {
      // throw new Error(`Unable to get all user: ${(err as Error).name}`)
      throw new Error(`Unable to get all user: ${(err as Error).stack}`)
    } finally {
      connection?.release
    }
  }
  //get specific user
  async getSpecificUser(id: string): Promise<User> {
    let connection: PoolClient | undefined = undefined

    try {
      //open connection with DB
      connection = await db.connect()
      //sql query
      const sql = `SELECT id, first_name, last_name, email FROM users WHERE id=($1) `
      // run query
      const result = await connection.query(sql, [id])
      //return the result
      return result.rows[0]
    } catch (err) {
      throw new Error(`Unable to create user: ${(err as Error).message}`)
    } finally {
      connection?.release
    }
  }
  //update user
  async updateUser(user: User): Promise<User> {
    let connection: PoolClient | undefined = undefined
    try {
      //open connection of the db
      connection = await db.connect()
      //wrie sql
      const sql = `UPDATE users 
      SET first_name=$1, last_name=$2, email=$3, password=$4
      WHERE id=$5 
      RETURNING id, first_name, last_name, email, password`
      //run sql
      const result = await connection.query(sql, [
        user.first_name,
        user.last_name,
        user.email,
        hashPassword(user.password),
        user.id
      ])

      return result.rows[0]
    } catch (err) {
      throw new Error(`Unable to update user: ${(err as Error).message}`)
    } finally {
      //release connection
      connection?.release
    }
  }
  //delete user
  async deleteUser(id: string): Promise<User> {
    let connection: PoolClient | undefined = undefined

    try {
      //open connection with DB
      connection = await db.connect()
      //sql query
      const sql = `DELETE FROM users WHERE id=($1)
                   RETURNING id, first_name, last_name, password, email `
      // run query
      const result = await connection.query(sql, [id])
      //return the result
      return result.rows[0]
    } catch (err) {
      throw new Error(`Unable to delete user: ${(err as Error).message}`)
    } finally {
      //release connection
      connection?.release
    }
  }
  //authuanticat user
  async authenticate(email: string, password: string): Promise<User | null> {
    let connection: PoolClient | undefined = undefined
    try {
      connection = await db.connect()
      const sql = `SELECT password FROM users WHERE email=$1`
      const result = await connection.query(sql, [email])
      if (result.rows.length) {
        const { password: hashPassword } = result.rows[0]
        const isPasswordValid = bcrypt.compareSync(`${password}${config.pepper}`, hashPassword)
        if (isPasswordValid) {
          const sql = 'SELECT id, email, first_name, last_name FROM users WHERE email=($1)'
          const userInfo = await connection.query(sql, [email])
          return userInfo.rows[0]
        }
      }
      return null
    } catch (err) {
      throw new Error(`Unable to authenticate user: ${(err as Error).message}`)
    } finally {
      connection?.release
    }
  }
}

export default UserModel
