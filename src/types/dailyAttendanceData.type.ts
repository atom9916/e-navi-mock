export interface DailyAttendanceData {
    userId: { S: string }
    date: { S: Date }
    state: { S: string }
    shift: { S: string }
    attendance: { S: string }
    punch_in: { S: string }
    punch_out: { S: string }
    break_time: { S: string }
    work_hour: { N: number }
    overtime: { N: number }
    midnight: { S: string }
    midnightOvertime: { S: string }
    timePaidHoliday: { N: number }
    lateOrEarlyLeave: { N: number }
    tardiness: { S: string }
    comment: { S: string }
  }