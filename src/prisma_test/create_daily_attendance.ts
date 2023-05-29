import prisma from '../../client'

export interface DailyAttendance {
  userId: number
  date?: Date
  state: string
  attendance: string
  punch_in: number
  punch_out: number
  break_time: number
  work_hour: number
  tardiness: string
  comment?: string
}

export async function createDailyAttendance(input: DailyAttendance) {
  await prisma.daily_attendance.create({
    data: {
      userId: input.userId,
      date: input.date,
      state: input.state,
      attendance: input.attendance,
      punch_in: input.punch_in,
      punch_out: input.punch_out,
      break_time: input.break_time,
      work_hour: input.work_hour,
      tardiness: input.tardiness,
      comment: input.comment
    }
  })

  const newWork = await prisma.daily_attendance.findFirst({
    where: { userId: 999 },
    orderBy: { id: 'desc' }
  })

  console.log('新規の日勤データをPOSTしました', newWork)
}

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

// createDailyAttendance(dailyWork)
