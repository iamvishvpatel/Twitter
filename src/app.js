import express, { urlencoded } from 'express'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
app.set("view engine", "ejs") 
app.set('views','src/views')


import userRouter from './routes/user.route.js'
import dashBoardRouter from './routes/dashboard.route.js'

app.use('/api/v1/user', userRouter)
app.use('/api/v1/dashboard', dashBoardRouter)

export {app}

