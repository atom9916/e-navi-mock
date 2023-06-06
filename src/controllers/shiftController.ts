import { PrismaClient } from '@prisma/client'
import { Router } from 'express'

const prisma = new PrismaClient()
const router = Router()

router.get('/', async (req, res) => {
  const allShiftData = await prisma.shift.findMany()
  res.json({ allShiftData })
})

export default router