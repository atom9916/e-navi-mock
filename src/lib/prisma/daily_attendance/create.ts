import prisma from '../../../../client'
import type { CreateDailyAttendance } from '@/types/daily_attendance.type'

export async function createDailyAttendance(input: CreateDailyAttendance) {
  try {
    await prisma.daily_attendance.create({ data: input })
    const newWork = await prisma.daily_attendance.findFirst({
      where: { userId: 999 },
      orderBy: { id: 'desc' }
    })
    if (newWork === undefined || null) {
      throw new Error('登録したデータが見つかりませんでした')
    }
    return newWork
  } catch (error) {
    console.error(error)
    return error
  }
}
