import ProductModel from '../product.model'
import Product from '../../types/product.type'
import db from '../../database'

const productModel = new ProductModel()
describe('This Suit will test the product Model Functionality', () => {
  //to be define or existing
  describe('This will test existing methode', () => {
    it('should have an methode that get all products', () => {
      expect(productModel.indexProduct).toBeDefined()
    })

    it('should have an methode that get specific product ', () => {
      expect(productModel.showSpecificProduct).toBeDefined()
    })

    it('should have an methode that update specific product ', () => {
      expect(productModel.updateProduct).toBeDefined()
    })

    it('should have an methode that delete specific product ', () => {
      expect(productModel.deleteProduct).toBeDefined()
    })

    it('should have an methode that create new product ', () => {
      expect(productModel.create).toBeDefined()
    })
  })

  //logic of method
  describe('This will test logic of product model', () => {
    const product = {
      name: 'test',
      price: '1',
      category: 'ghg',
      quantity: 2
    } as Product

    beforeAll(async () => {
      const createProduct = await productModel.create(product)
      product.id = createProduct.id
    })

    afterAll(async () => {
      const connection = await db.connect()
      //sql
      const sql = 'DELETE FROM product'
      await connection.query(sql)
      connection.release()
    })

    //so now database prepared
    it('create method should return a new product', async () => {
      const createdProduct = await productModel.create({
        name: 'test2',
        price: '10',
        category: 'aa'
      } as Product)
      expect(createdProduct).toEqual({
        id: createdProduct.id,
        name: 'test2',
        price: '10',
        category: 'aa'
      } as Product)
    })

    it('get all product should return all products from DB', async () => {
      const products = await productModel.indexProduct()
      expect(products.length).toBe(3)
    })

    it('get specific product by id', async () => {
      const returnedProduct = await productModel.showSpecificProduct(product.id as string)
      expect(returnedProduct.id).toBe(product.id)
      expect(returnedProduct.name).toBe(product.name)
      expect(returnedProduct.price).toBe(product.price)
      expect(returnedProduct.category).toBe(product.category)
    })
  })
})
