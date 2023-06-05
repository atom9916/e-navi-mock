import express from 'express'
import notificationController from './controllers/notificationController'

const app: express.Express = express()
const port = 3000

app.use(express.json())

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello Vue.js!\n' })
})

app.use('/notification', notificationController)

export const server = app.listen(port, () => {
  console.log(`this app listening on port ${port}`)
})
