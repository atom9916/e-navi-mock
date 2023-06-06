import { PrismaClient,  } from '@prisma/client'
import { Router } from 'express'

const prisma = new PrismaClient()
const router = Router()

router.get('/', async (req, res) => {
  const allAttendantClass = await prisma.attendance.findMany()
  res.json({ allAttendantClass })
})

export default router
