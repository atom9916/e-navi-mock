import prisma from '../../client'

interface createDailyAttendance {
  id: number
  userId: number
  date: Date
  state: string
  attendance: string
  punch_in: number
  punch_out: number
  break_time: number
  work_hour: number
  tardiness: string
  comment: string
}

export async function createDailyAttendance(work: createDailyAttendance) {
  return await prisma.daily_attendance.create({
    data: work
  })
}

interface UpdateDailyAttendance {
  id: number
  state?: string
  attendance?: string
  punch_in?: number
  punch_out?: number
  break_time?: number
  work_hour?: number
  tardiness?: string
  comment?: string
}

export async function updateDailyAttendance(work: UpdateDailyAttendance) {
  return await prisma.daily_attendance.update({
    where: { id: work.id },
    data: work
  })
}
