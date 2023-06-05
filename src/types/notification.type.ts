export interface CreateNotification {
  created_at: Date
  deleted_at: Date
  content: string
  create_user: string
  read_user: string[]
}

export interface UpdateNotification {
  id: number
  deleted_at?: Date
  content?: string
  read_user?: string[]
}

export interface DeleteNotification {
  id: number
}
