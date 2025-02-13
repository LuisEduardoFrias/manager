import express from 'express'
import ProjectController from '../controllers/project_controller.js'
import { valudateSearch, validateCreate, validateDelete } from '../helpers/validations.js'

const routes = express.Router()

routes.get('/', ProjectController.get)
routes.get('/total/:id', ProjectController.totalCalculation)
///:page([0-9]+)?/:limit([0-9]+)?/:totalPages([0-9]+)?
routes.get('/:name', valudateSearch, ProjectController.search)
routes.post('/', validateCreate, ProjectController.create)
routes.delete('/:ids', validateDelete, ProjectController.delete)

export default routes;