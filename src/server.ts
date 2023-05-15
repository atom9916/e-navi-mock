import express from 'express'
import userController from './controllers/userController'

const app: express.Express = express()
const port = 3000

app.use(express.json())

app.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.end('Hello express!!\n')
})

app.use('/users', userController)

app.listen(port, () => {
  console.log(`this app listening on port ${port}`)
})
