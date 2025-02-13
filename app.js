import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import { PORT } from './src/helpers/config_consts.js'
import DbClient from './src/helpers/db_client.js'
import Middleware from './src/helpers/middleware.js'
import AuthRoute from './src/routes/auth_route.js'
import LineRoute from './src/routes/line_route.js'
import ProjectRoute from './src/routes/project_route.js'
import MovementRoute from './src/routes/movement_route.js'

const app = express()
app.use(express.text())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser());
app.use(cors())

app.use('/auth', AuthRoute);
app.use(Middleware);
app.use('/line', LineRoute);
app.use('/project', ProjectRoute);
app.use('/movement', MovementRoute);

app.listen(PORT, () => {
  console.log(`Server active ${PORT}`)
})

process.on('SIGINT', async () =>  DbClient.closeDb())