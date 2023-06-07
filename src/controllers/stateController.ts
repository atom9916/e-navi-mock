import { PrismaClient } from '@prisma/client'
import { Router } from 'express'

const prisma = new PrismaClient()
const router = Router()

router.get('/', async (req, res) => {
  const allStateData = await prisma.state.findMany()
  res.json({ allStateData })
})

export default router
