export interface CreateDailyAttendance {
  userId: number
  date?: Date
  state?: string
  attendance?: string
  punch_in?: number
  punch_out?: number
  break_time?: number
  work_hour?: number
  tardiness?: string
  comment?: string
}

export interface DeleteDailyAttendance {
  id: number
  userId: number
}
