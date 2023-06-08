export interface PaidOff {
  id: number
  user_email: string
  total_amount: number
  used_amount: number
  remaining_amount: number
}

export interface CreatePaidOff {
  user_id: string
  total_amount?: number
  used_amount?: number
  remaining_amount?: number
}

export interface UpdatePaidOff {
  total_amount?: number
  used_amount?: number
  remaining_amount?: number
}

export interface DeletePaidOff {
  id: number
}
