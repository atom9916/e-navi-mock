import { PrismaClient } from '@prisma/client'
import { Router } from 'express'

const prisma = new PrismaClient()
const router = Router()

router.get('/', async (req, res) => {
  const allTardinessData = await prisma.tardiness.findMany()
  res.json({ allTardinessData })
})

export default router
