import express from 'express'
import MovementController from '../controllers/movement_controller.js'
import { validateCreate } from '../helpers/validations.js'

const routes = express.Router()

routes.get('/:id', MovementController.get)
routes.get('/total/:id', MovementController.totalCalculation)
routes.post('/:id', validateCreate, MovementController.create)
routes.delete('/:ids', MovementController.delete)

export default routes;