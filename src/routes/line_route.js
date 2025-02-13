import express from 'express'
import LineController from '../controllers/line_controller.js'
import { validateCreate } from '../helpers/validations.js'

const routes = express.Router()

routes.get('/:id', LineController.get)
routes.get('/total/:id', LineController.totalCalculation)
routes.post('/:id', validateCreate, LineController.create)
routes.put('/:id', LineController.update)
routes.delete('/:ids', LineController.delete)

export default routes;