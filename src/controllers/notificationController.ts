import { Router } from 'express'
import { createNotification } from '../lib/prisma/notification/create'
import { deleteNotification } from '../lib/prisma/notification/delete'
import { getAllNotification } from '../lib/prisma/notification/get'
import { updateNotification } from '../lib/prisma/notification/update'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const allNotification = await getAllNotification()
    res.status(200).json({ message: 'お知らせデータを取得しました', data: allNotification })
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: error })
  }
})

router.post('/', async (req, res) => {
  try {
    const newNotification = await createNotification(req.body)
    if (newNotification instanceof Error) {
      throw new Error(`お知らせデータの登録に失敗しました${newNotification}`)
    }
    res.status(200).json({ message: '新しいお知らせを登録しました', data: newNotification })
  } catch (error: any) {
    res.status(400).json({ message: error.message })
  }
})

router.put('/', async (req, res) => {
  try {
    const updateData = await updateNotification(req.body)
    if (updateData instanceof Error) {
      throw new Error('お知らせデータの更新に失敗しました')
    }
    res.status(200).json({ message: 'お知らせデータを更新しました', data: updateData })
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: error })
  }
})

router.delete('/', async (req, res) => {
  try {
    const deleteData = await deleteNotification(req.body)
    if (deleteData instanceof Error) {
      throw new Error(`お知らせデータの削除に失敗しました：${deleteData} `)
    }
    res.status(200).json({ message: 'お知らせデータを削除しました', data: deleteData })
  } catch (error: any) {
    res.status(400).json({ message: error.message })
  }
})

export default router
