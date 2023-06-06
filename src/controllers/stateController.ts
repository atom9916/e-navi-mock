import { PrismaClient,  } from '@prisma/client'
import { Router } from 'express'

const prisma = new PrismaClient()
const router = Router()

router.get('/', async (req, res) => {
  const allState = await prisma.attendance.findMany()
  res.json({ allState })
})

export default router
