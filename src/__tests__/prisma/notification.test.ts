import prisma from '../../../client'
import { createNotification } from '@/lib/prisma/notification/create'
import { updateNotification } from '@/lib/prisma/notification/update'
import { getAllNotification } from '@/lib/prisma/notification/get'
import { deleteNotification } from '@/lib/prisma/notification/delete'

beforeEach(async () => {
  const testData = {
    id: 99999,
    created_at: today,
    deleted_at: nextWeek,
    content: 'すべてのテストで仕様するお知らせデータです。',
    create_user: 'test99999',
    read_user: []
  }
  await createNotification(testData)
})

afterEach(async () => {
  await prisma.notification.deleteMany()
})

afterAll(async () => {
  await prisma.notification.deleteMany()

  await prisma.$disconnect()
})

const today = new Date()
const nextWeek = new Date(today.setDate(today.getDate() + 7))

describe('notificationテーブルに関するテスト', () => {
  test('お知らせデータを取得する', async () => {
    await prisma.$transaction(async () => {
      const existingData = await getAllNotification()

      expect(existingData).toEqual({
        id: 99999,
        created_at: today,
        deleted_at: nextWeek,
        content: 'すべてのテストで仕様するお知らせデータです。',
        create_user: 'test99999',
        read_user: []
      })
    })
  })

  it('新しいお知らせデータが作成される', async () => {
    const newNotification = {
      created_at: today,
      deleted_at: nextWeek,
      content: 'テスト用の新しいお知らせです。',
      create_user: 'test99999',
      read_user: []
    }

    await prisma.$transaction(async (prisma) => {
      await createNotification(newNotification)

      const latestNotification = await prisma.notification.findFirst({
        orderBy: { id: 'desc' }
      })

      expect(latestNotification).toEqual(newNotification)
    })
  })

  test('お知らせデータが更新される', async () => {
    const updateData = {
      id: 99999,
      content: '更新後のお知らせデータです'
    }

    await prisma.$transaction(async (prisma) => {
      await updateNotification(updateData)

      const updatedData = await prisma.notification.findFirst({
        where: { id: 99999 }
      })

      expect(updatedData).toEqual({
        id: 99999,
        created_at: today,
        deleted_at: nextWeek,
        content: '更新後のお知らせデータです',
        create_user: 'test99999',
        read_user: []
      })
    })
  })

  test('お知らせデータを削除する', async () => {
    await prisma.$transaction(async (prisma) => {
      const latestData = await prisma.notification.findFirst({
        where: { id: 99999 }
      })

      expect(latestData).toBeDefined()

      await deleteNotification({ id: 99999 })

      expect(latestData).toBeUndefined()
    })
  })
})
