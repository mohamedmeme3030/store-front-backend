import Router from 'express'
import userRoutes from './api/users.routes'
import orderRoutes from './api/order.routes'
import productRoutes from './api/product.routes'
//invoke express()
const routes = Router()
//use some routes
routes.use('/users', userRoutes)
routes.use('/order', orderRoutes)
routes.use('/product', productRoutes)

export default routes
