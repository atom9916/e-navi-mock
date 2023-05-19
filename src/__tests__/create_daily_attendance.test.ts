import prisma from '../../client'
import { createDailyAttendance } from '../prisma_test/create_daily_attendance'

beforeAll(async () => {
  //ユーザーデータの作成
  await prisma.$transaction(async (prisma) => {
    await prisma.user.create({
      data: {
        id: 999,
        name: '山田 太郎',
        email: 'yamada@test.io',
        password: 'yamada-test',
        departmentId: 1
      }
    })

    const testUser = await prisma.user.findFirst({
      orderBy: { id: 'desc' }
    })

    console.log('ユーザーを作成しました', testUser)
  })
})

afterAll(async () => {
  await prisma.user.deleteMany()

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
