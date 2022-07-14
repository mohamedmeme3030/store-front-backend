import { Router } from 'express'
import * as controllers from '../../controllers/order.controllers'
import validateToken from '../../middleware/athentication.middleware'

const routes = Router()
//order routing
//first we validate that user is authorized
//after that we can make order
routes.route('/create').post(validateToken, controllers.create)
routes.route('/index').get(validateToken, controllers.index)
routes.route('/delete').delete(validateToken, controllers.deleteOrder)
export default routes
