import { createNotification, updateNotification } from '@/prisma_test/functions-without-context'
import { prismaMock } from '../../../singleton'

const today = new Date()
const nextWeek = new Date(today.setDate(today.getDate() + 7))

describe('prismaのモックを使用したテスト', () => {
  test('新しいお知らせデータが作成される', async () => {
    const notification = {
      id: 1,
      created_at: today,
      deleted_at: nextWeek,
      content: 'テスト用のコンテンツです',
      create_user: 'test99999',
      read_user: []
    }

    prismaMock.notification.create.mockResolvedValue(notification)

    await expect(createNotification(notification)).resolves.toEqual({
      id: 1,
      created_at: today,
      deleted_at: nextWeek,
      content: 'テスト用のコンテンツです',
      create_user: 'test99999',
      read_user: []
    })
  })

  test('お知らせデータが更新される', async () => {
    const updatedNotification = {
      id: 1,
      created_at: today,
      deleted_at: nextWeek,
      content: '更新後のコンテンツです',
      create_user: 'test99999',
      read_user: []
    }

    const updateData = {
      id: 1,
      comment: '更新後のコンテンツです'
    }

    prismaMock.notification.update.mockResolvedValue(updatedNotification)

    await expect(updateNotification(updateData)).resolves.toEqual(updatedNotification)
  })
})
