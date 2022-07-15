import { PoolClient } from 'pg'
import Order from '../types/order.type'
import db from '../database'

class OrderModel {
  async getCurrentOrderByUserId(id: string): Promise<Order> {
    let connection: PoolClient | undefined = undefined
    try {
      //open connection with DB
      connection = await db.connect()
      //sql query
      const sql = `SELECT order_id, order_status FROM orders 
       WHERE user_id=$1 `
      // run query
      const result = await connection.query<Order>(sql, [id])

      //return created user
      return result.rows[0]
    } catch (error) {
      throw new Error(`Unable to get Order : ${(error as Error).message}`)
    } finally {
      //after query release the connection
      connection?.release()
    }
  }
  //create new
  async create(order: Order): Promise<Order> {
    let connection: PoolClient | undefined = undefined
    try {
      //open connection with DB
      connection = await db.connect()
      //sql query
      const sql = `INSERT INTO orders (user_id, order_status) 
      VALUES ($1,$2) returning user_id, order_status `
      // run query
      const result = await connection.query<Order>(sql, [order.user_id, order.status])

      //return created user
      return result.rows[0]
    } catch (error) {
      throw new Error(`Unable to create Order : ${(error as Error).message}`)
    } finally {
      //after query release the connection
      connection?.release()
    }
  }

  async index(): Promise<Order[]> {
    let connection: PoolClient | undefined = undefined
    try {
      //open connection
      connection = await db.connect()
      //write sql
      const sql = `SELECT * FROM orders`
      //run sql
      const result = await connection.query(sql)
      //get the result
      return result.rows
    } catch (err) {
      throw new Error('somthing wrong happened in server')
    } finally {
      connection?.release
    }
  }

  //delete user
  async deleteOrder(order: Order): Promise<Order> {
    let connection: PoolClient | undefined = undefined

    try {
      //open connection with DB
      connection = await db.connect()
      //sql query
      const sql = `DELETE FROM orders WHERE user_id=($1) 
                     
                     RETURNING order_id, user_id`
      // run query
      const result = await connection.query(sql, [order.user_id])
      //return the result
      return result.rows[0]
    } catch (err) {
      throw new Error(`Unable to delete order: ${(err as Error).message}`)
    } finally {
      //release connection
      connection?.release
    }
  }
}

export default OrderModel
