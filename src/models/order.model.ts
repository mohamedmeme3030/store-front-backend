import { PoolClient } from 'pg'
import Order from '../types/order.type'
import db from '../database'
import { type } from 'os'
type OrderProduct = {
  o_id: string
  p_id: string
  quantity: number
}
class OrderModel {
  //this method get products of order based on order id and status is Active
  async getCurrentOrderByUserId(id: string): Promise<Order[]> {
    let connection: PoolClient | undefined = undefined
    try {
      //open connection with DB
      connection = await db.connect()
      //sql query
      const sqlToGetOrderList = `SELECT order_id, order_status FROM orders 
       WHERE user_id=$1`
      // run query
      const result = await connection.query<Order>(sqlToGetOrderList, [id])
      //array of product
      for (const order of result.rows) {
        //get Products Of Order
        const productsID = await this.getProductsOfOrder(order.order_id as string)
        order.products = productsID
      }
      //return created user
      return result.rows
    } catch (error) {
      throw new Error(`Unable to get Order : ${(error as Error).message}`)
    } finally {
      //after query release the connection
      connection?.release()
    }
  }

  //get all products of specific order
  async getProductsOfOrder(orderId: string): Promise<string[]> {
    let connection: PoolClient | undefined = undefined
    try {
      //open connection with DB
      connection = await db.connect()
      //sql query
      // const sqlToGetProducts = `SELECT p_order.
      // product.name, product.price,
      // p_order.quantity, product.id
      // FROM product INNER JOIN p_order ON product.id = p_order.p_id`

      //write sql inner join to get all product id from
      //p_order table with orders table
      const sqlGetProductsID = `SELECT p_order.p_id 
      FROM p_order INNER JOIN orders ON orders.order_id=p_order.o_id
      WHERE orders.order_id=$1`
      //run this query
      const result = await connection.query(sqlGetProductsID, [orderId])
      return result.rows
    } catch (err) {
      throw new Error(`Unable to get Order : ${(err as Error).message}`)
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
      //sql query to insert into basic order info(user_id, status)
      const sqlInsertBasicOrderInfo = `INSERT INTO orders (user_id, order_status) 
      VALUES ($1,$2) returning *`

      // run query
      const resultInsertBasicOrderInfo = await connection.query<Order>(sqlInsertBasicOrderInfo, [
        order.user_id,
        order.order_status
      ])
      if (resultInsertBasicOrderInfo.rowCount === 0) throw new Error(`not able to create order`)
      //indeed we need insert order id and product id
      //to able to get all products by the order id
      // const sqlOrderProduct = `INSERT INTO p_order (p_id, o_id, quantity)
      //                          VALUES ($1,$2,$3) returning *`
      // // //productArr this array of products of this order
      // const productArr = []
      // let resultProductOrder = undefined
      // for (const product of order.products) {
      //   product.quantity = 1
      //   // console.log(product)
      //   //run query that insert into order_product
      //   resultProductOrder = await connection.query<Order>(sqlOrderProduct, [
      //     product.id,
      //     resultInsertBasicOrderInfo.rows[0].order_id,
      //     product.quantity
      //   ])
      //   //push this current product to arr
      //   productArr.push(resultProductOrder.rows[0])
      // }

      //return created user
      return resultInsertBasicOrderInfo.rows[0]
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
      const sql = `SELECT order_id, order_status, user_id FROM orders`
      //run sql
      const result = await connection.query(sql)
      //get the result
      return result.rows
    } catch (err) {
      throw new Error('somthing wrong happened in server')
    } finally {
      connection?.release()
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
      connection?.release()
    }
  }

  //add product
  async addProduct(quantity: number, orderId: string, productId: string): Promise<OrderProduct> {
    let connection: PoolClient | undefined = undefined

    try {
      //write sql that insert into p_order
      const sql =
        'INSERT INTO p_order (p_id,o_id,quantity) VALUES ($1,$2,$3) returning p_id, o_id, quantity'
      //open connection with DB
      connection = await db.connect()

      const result = await connection.query(sql, [productId, orderId, quantity])
      return result.rows[0]
    } catch (err) {
      throw new Error(`Could not add product ${productId} to order ${orderId}: ${err}`)
    } finally {
      connection?.release()
    }
  }
}

export default OrderModel
