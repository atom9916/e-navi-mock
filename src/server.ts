import express from 'express'
// import userController from './controllers/userController'
import dailyAttendanceController from './controllers/dailyAttendanceController'
import monthlyAttendanceController from './controllers/mothlyAttendanceController'

const app: express.Express = express()
const port = 3000

app.use(express.json())

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello Vue.js!\n' })
})

// app.use('/users', userController)
app.use('/day', dailyAttendanceController)
app.use('/month', monthlyAttendanceController)

export const server = app.listen(port, () => {
  console.log(`this app listening on port ${port}`)
})
