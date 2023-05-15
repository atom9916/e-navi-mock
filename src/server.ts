import express from 'express'
import userController from './controllers/userController'
import dailyAttendanceController from './controllers/dailyAttendanceController'
import monthlyAttendanceController from './controllers/mothlyAttendanceController'

const app: express.Express = express()
const port = 4242

app.use(express.json())

app.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.end('Hello express!!\n')
})

app.use('/users', userController)
app.use('/day', dailyAttendanceController)
app.use('/month', monthlyAttendanceController)

app.listen(port, () => {
  console.log(`this app listening on port ${port}`)
})
