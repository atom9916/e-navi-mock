import { PrismaClient } from '@prisma/client'
import { Router } from 'express'

const prisma = new PrismaClient()
const router = Router()

router.get('/', async (req, res) => {
  const allAttendanceData = await prisma.attendance.findMany()
  res.json({ allAttendanceData })
})

export default router
