import { PrismaClient } from '@prisma/client'
import { Router } from 'express'

const prisma = new PrismaClient()
const router = Router()

router.get('/', async (req, res) => {
  const allDailyWorkData = await prisma.daily_attendance.findMany()
  res.json({ allDailyWorkData })
})

router.get('/:id', async (req, res) => {
  const dailyWorkDataByUserId = await prisma.daily_attendance.findMany({
    where: { userId: Number(req.params.id) }
  })
  res.json({ dailyWorkDataByUserId })
})

router.put('/:id', async (req, res) => {
  const { id } = req.body
  const updatedWork = await prisma.daily_attendance.update({
    where: { userId: Number(req.params.id), id: id },
    data: req.body
  })
  res.json({ updatedWork })
})

router.post('/:id', async (req, res) => {
  const newWork = await prisma.daily_attendance.create({
    data: req.body
  })
  res.json({ newWork })
})

router.delete('/:id', async (req, res) => {
  const { id } = req.body
  const deletedWork = await prisma.daily_attendance.delete({
    where: { userId: Number(req.params.id), id: id }
  })
  res.json({ deletedWork })
})

export default router
