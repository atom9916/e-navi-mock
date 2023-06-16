import express from 'express'
import notificationController from './controllers/notificationController'
import attendanceController from './controllers/attendanceController'
import tardinessController from './controllers/tardinessController'
import stateController from './controllers/stateController'
import shiftController from './controllers/shiftController'
import paidOffController from './controllers/paidOffController'

const app: express.Express = express()
const port = 4242

app.use(express.json())

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST,PUT')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello Vue.js!\n' })
})

app.use('/notification', notificationController)
app.use('/attendance', attendanceController)
app.use('/tardiness', tardinessController)
app.use('/state', stateController)
app.use('/shift', shiftController)
app.use('/paidOff', paidOffController)

export const server = app.listen(port, () => {
  console.log(`this app listening on port ${port}`)
})
