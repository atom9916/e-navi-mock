export interface DailyAttendanceData {
    userId: { S: string }
    date: { S: Date }
    state: { S: string }
    shift: { S: string }
    attendance: { S: string }
    punch_in: { S: string }
    punch_out: { S: string }
    break_time: { S: string }
    work_hour: { S: string  }
    overtime: { S: string  }
    midnight: { S: string }
    midnightOvertime: { S: string }
    timePaidHoliday: { S: string  }
    lateOrEarlyLeave: { S: string  }
    tardiness: { S: string }
    comment: { S: string }
  }