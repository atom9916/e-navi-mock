import prisma from '../../../client'
import { createDailyAttendance } from '@/lib/prisma/daily_attendance/create'

const today = new Date()

afterAll(async () => {
  await prisma.daily_attendance.deleteMany()

  await prisma.$disconnect()
})

it('新しい日勤データが作成される', async () => {
  const dailyWork = {
    id: 99999,
    userId: 999,
    date: today,
    state: '入力済',
    attendance: '出勤',
    punch_in: 9,
    punch_out: 18,
    break_time: 1,
    work_hour: 8,
    tardiness: 'なし'
  }

  await prisma.$transaction(async (prisma) => {
    await createDailyAttendance(dailyWork)

    const newWorkData = await prisma.daily_attendance.findFirst({
      where: { userId: 999 },
      orderBy: { id: 'desc' }
    })

    expect(newWorkData).toEqual(dailyWork)
  })
})

// TypeScriptの型アサーションが先に働きテストが失敗する
test('不正なデータを引数に取ると、エラーが発生する', async () => {
  const errorData = {
    userId: 123,
    date: today,
    state: 123456, //本来は文字列
    attendance: '出勤',
    punch_in: '本来は数値'
  }

  await prisma.$transaction(async () => {
    const error = await createDailyAttendance(errorData)

    expect(error).toThrowError()
  })
})
