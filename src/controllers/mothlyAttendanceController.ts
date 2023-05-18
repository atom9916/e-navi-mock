import { PrismaClient } from '@prisma/client'
import { Router } from 'express'

const prisma = new PrismaClient()
const router = Router()

router.get('/', async (req, res) => {
  const allWorkData = await prisma.monthly_attendance.findMany()
  res.json({ allWorkData })
})

router.get('/:id', async (req, res) => {
  const workDataByUserId = await prisma.monthly_attendance.findMany({
    where: { userId: Number(req.params.id) }
  })
  res.json({ workDataByUserId })
})

router.post('/:id', async (req, res) => {
  const newWork = await prisma.monthly_attendance.create({
    data: req.body
  })
  res.json({ newWork })
})

router.put('/:id', async (req, res) => {
  const { id } = req.body
  const updatedWork = await prisma.monthly_attendance.update({
    where: { id: id },
    data: req.body
  })
  res.json({ updatedWork })
})

router.delete('/:id', async (req, res) => {
  const { id } = req.body
  const deletedWork = await prisma.monthly_attendance.delete({
    where: { id: id }
  })
  res.json({ deletedWork })
})

export default router
