import express from 'express'
import cors from 'cors'

import Middleware from './src/helpers/middleware.js'
import AuthRoute from './src/routes/auth_route.js'
import LineRoute from './src/routes/line_route.js'
import ProjectRoute from './src/routes/project_route.js'
import MovementRoute from './src/routes/movement_route.js'

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extends: true }))
app.use(cors())

app.use('/', Middleware);
app.use('/auth', AuthRoute);
app.use('/line', LineRoute);
app.use('/project', ProjectRoute);
app.use('/movement', MovementRoute);

app.listen(process.env.PORT || 3000, () => {
  console.log('server on')
})