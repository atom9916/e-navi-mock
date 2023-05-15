import { PrismaClient } from '@prisma/client'
import { Router } from 'express'
import type { Request, Response } from 'express'

const prisma = new PrismaClient()
const router = Router()

router.get('/', async (req: Request, res: Response) => {
  const users = await prisma.user.findMany()
  res.json({ users })
})

router.get('/:id', async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: parseInt(req.params.id) }
  })
  res.json({ user })
})

router.post('/', async (req, res) => {
  const { name, email, password, departmentId } = req.body
  const user = await prisma.user.create({
    data: { name, email, password, departmentId }
  })
  res.json({ user })
})

router.put('/:id', async (req, res) => {
  const user = await prisma.user.update({
    where: { id: parseInt(req.params.id) },
    data: req.body
  })
  res.json({ user })
})

router.delete('/:id', async (req, res) => {
  const user = await prisma.user.delete({
    where: { id: parseInt(req.params.id) }
  })
  res.json({ user })
})

export default router
