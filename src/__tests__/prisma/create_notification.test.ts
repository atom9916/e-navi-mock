import prisma from '../../../client'
import { createNotification } from '@/lib/prisma/notification/create'

afterAll(async () => {
  await prisma.notification.deleteMany()

  await prisma.$disconnect()
})

describe('notificationテーブルに関するテスト', () => {
  it('新しいお知らせデータが作成される', async () => {
    const today = new Date()
    const nextWeek = new Date(today.setDate(today.getDate() + 7))

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

  // // TypeScriptの型アサーションが先に働きテストが失敗する
  // test('不正なデータを引数に取ると、エラーが発生する', async () => {
  //   const errorData = {
  //     userId: 123,
  //     state: 123456, //本来は文字列
  //     attendance: '出勤',
  //     punch_in: '本来は数値'
  //   }

  //   await prisma.$transaction(async () => {
  //     const error = await createNotification(errorData)

  //     expect(error).toThrowError()
  //   })
  // })
})
