import express from 'express'
import notificationController from './controllers/notificationController'
import attendanceController from './controllers/attendanceController'
import tardinessController from './controllers/tardinessController'
import stateController from './controllers/stateController'
import shiftController from './controllers/shiftController'

const app: express.Express = express()
const port = 3000

app.use(express.json())

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello Vue.js!\n' })
})

app.use('/notification', notificationController)
app.use('/attendance', attendanceController)
app.use('/tardiness', tardinessController)
app.use('/state', stateController)
app.use('/shift', shiftController)

export const server = app.listen(port, () => {
  console.log(`this app listening on port ${port}`)
})
