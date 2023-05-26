import prisma from '../../client'
import { createDailyAttendance } from '@/prisma_test/create_daily_attendance'

afterAll(async () => {
  await prisma.daily_attendance.deleteMany()

  await prisma.$disconnect()
})

it('新しい日勤データが作成される', async () => {
  const today = new Date()

  const dailyWork = {
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
