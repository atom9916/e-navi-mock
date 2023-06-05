import prisma from 'client'
import type { DeleteDailyAttendance } from '@/types/daily_attendance.type'

export async function deleteDailyAttendance(input: DeleteDailyAttendance) {
  try {
    await prisma.daily_attendance.delete({
      where: { id: input.id }
    })
  } catch (error) {
    console.error(error)
    return error
  }
}
