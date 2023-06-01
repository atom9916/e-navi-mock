import {
  createDailyAttendance,
  updateDailyAttendance
} from '@/prisma_test/functions-without-context'
import { prismaMock } from '../../../singleton'

const today = new Date()

test('should create new daily_attendance', async () => {
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
    tardiness: 'なし',
    comment: ''
  }

  prismaMock.daily_attendance.create.mockResolvedValue(dailyWork)

  await expect(createDailyAttendance(dailyWork)).resolves.toEqual({
    id: 1,
    name: 'John',
    email: 'john@prisma.io',
    password: 'john',
    departmentId: 1
  })
})

test('should update user name', async () => {
  const updatedWork = {
    id: 99999,
    userId: 999,
    date: today,
    state: '入力済',
    attendance: '出勤',
    punch_in: 9,
    punch_out: 20,
    break_time: 2,
    work_hour: 10,
    tardiness: 'なし',
    comment: '編集しました'
  }

  const updateData = {
    id: 99999,
    punch_out: 20,
    break_time: 2,
    work_hour: 10,
    comment: '編集しました'
  }

  prismaMock.daily_attendance.update.mockResolvedValue(updatedWork)

  await expect(updateDailyAttendance(updateData)).resolves.toEqual(updatedWork)
})
