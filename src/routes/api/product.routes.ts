import { Router } from 'express'
import validateToken from '../../middleware/athentication.middleware'
import * as controller from '../../controllers/product.controllers'
const routes = Router()
routes.route('/index').get(validateToken, controller.index)
routes.route('/get').get(validateToken, controller.getProduct)
routes.route('/create').post(validateToken, controller.create)
routes.route('/update').patch(validateToken, controller.update)
routes.route('/delete').delete(validateToken, controller.deleteProduct)

export default routes
