import { Router } from 'express'
import { getAllPaidOff, getPaidOffByUserId } from '@/lib/prisma/paidOff/get'
import { createPaidOff } from '@/lib/prisma/paidOff/create'
import { updatePaidOff } from '@/lib/prisma/paidOff/update'
import { deletePaidOff } from '@/lib/prisma/paidOff/delete'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const allPaidOff = await getAllPaidOff()
    if (allPaidOff instanceof Error) {
      throw new Error(`${allPaidOff}`)
    }
    res.status(200).json({ message: '有給データを全権取得しました' ,allPaidOff})
  } catch (error: any) {
    res.status(400).json({ message: `有給データの取得に失敗しました:${error.message}` })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const usersPaidOff = await getPaidOffByUserId(req.params.id)
    if (usersPaidOff instanceof Error) {
      throw new Error(`${usersPaidOff}`)
    }
    res.status(200).json({
      message: `ID${req.params.id}のユーザーの有給データを取得しました`,
      paidOff: usersPaidOff
    })
  } catch (error: any) {
    res.status(400).json({ message: `有給データの取得に失敗しました:${error.message}` })
  }
})

router.post('/', async (req, res) => {
  try {
    const newPaidOff = await createPaidOff(req.body)
    if (newPaidOff instanceof Error) {
      throw new Error(`${newPaidOff}`)
    }
    res.status(200).json({ message: `有給データの作成に成功しました：${newPaidOff}` })
  } catch (error: any) {
    res.status(400).json({ message: `有給データの作成に失敗しました：${error.message}` })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const update = await updatePaidOff(req.params.id, req.body)
    if (update instanceof Error) {
      throw new Error(`${update}`)
    }
    res.status(200).json({ message: `有給データの更新に成功しました：${update}` })
  } catch (error: any) {
    res.status(400).json({ message: `有給データの変更に失敗しました：${error.message}` })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const deleteData = await deletePaidOff(Number(req.params.id))
    if (deleteData instanceof Error) {
      throw new Error(`${deleteData}`)
    }
    res.status(200).json({ message: `有給データの削除に成功しました：${deleteData}` })
  } catch (error: any) {
    res.status(400).json({ message: `有給データの削除に失敗しました：${error.message}` })
  }
})

export default router
