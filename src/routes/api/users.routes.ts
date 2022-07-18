import { Router } from 'express'
import * as controllers from '../../controllers/users.controllers'
import validateToken from '../../middleware/athentication.middleware'
//invoke express()
const routes = Router()
//user routing
routes.route('/create').post(controllers.create)
routes.route('/get/:id').get(validateToken, controllers.getSpecificUser)
routes.route('/index').get(validateToken, controllers.getAllUser)
routes.route('/delete/:id').delete(validateToken, controllers.deleteUser)
routes.route('/update').patch(validateToken, controllers.updateSpecificUser)
//authenticate user
routes.route('/authenticate').post(controllers.authenticateUser)
export default routes
