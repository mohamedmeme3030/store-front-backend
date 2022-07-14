import { PoolClient } from 'pg'
import Product from '../types/product.type'
import db from '../database'

class ProductModel {
  //get all products
  async indexProduct(): Promise<Product[]> {
    let connection: PoolClient | undefined = undefined

    try {
      //open connection with DB
      connection = await db.connect()
      //sql query
      const sql = `SELECT * FROM product`
      // run query
      const result = await connection.query(sql)
      //return the result
      return result.rows
    } catch (err) {
      // throw new Error(`Unable to get all user: ${(err as Error).name}`)
      throw new Error(`Unable to get all products: ${(err as Error).stack}`)
    } finally {
      connection?.release
    }
  }
  //show Specific Product
  async showSpecificProduct(id: string): Promise<Product> {
    let connection: PoolClient | undefined = undefined

    try {
      //open connection with DB
      connection = await db.connect()
      //sql query
      const sql = `SELECT id, name, price, category FROM product WHERE id=($1) `
      // run query
      const result = await connection.query(sql, [id])
      //return the result
      return result.rows[0]
    } catch (err) {
      throw new Error(`Unable to show product: ${(err as Error).message}`)
    } finally {
      connection?.release
    }
  }
  //create new product
  async create(product: Product): Promise<Product> {
    let connection: PoolClient | undefined = undefined
    try {
      //open connection with DB
      connection = await db.connect()
      //sql query
      const sql = `INSERT INTO product (name, price, category) 
          VALUES ($1,$2,$3) returning id, name, price, category `
      // run query
      const result = await connection.query(sql, [product.name, product.price, product.category])

      //return created product
      return result.rows[0]
    } catch (error) {
      throw new Error(`Unable to create product (${product.name}): ${(error as Error).message}`)
    } finally {
      //after query release the connection
      connection?.release()
    }
  }
  //delete product
  async deleteProduct(id: string): Promise<Product> {
    let connection: PoolClient | undefined = undefined

    try {
      //open connection with DB
      connection = await db.connect()
      //sql query
      const sql = `DELETE FROM product WHERE id=($1) 
                  
                     RETURNING name, price, category`
      // run query
      const result = await connection.query(sql, [id])
      //return the result
      return result.rows[0]
    } catch (err) {
      throw new Error(`Unable to delete product: ${(err as Error).message}`)
    } finally {
      //release connection
      connection?.release
    }
  }

  async updateProduct(product: Product): Promise<Product> {
    let connection: PoolClient | undefined = undefined
    try {
      //open connection
      connection = await db.connect()
      //write aql
      const sql = `UPDATE product SET name=$1, price=$2, category=$3
                  WHERE id=$4
                  RETURNING name, price, category`
      //RUN SQL
      const result = await connection.query(sql, [
        product.name,
        product.price,
        product.category,
        product.id
      ])
      //get the result
      return result.rows[0]
    } catch (err) {
      throw new Error('not able to update')
    }
  }
}
export default ProductModel
