import prisma from '../../../../client'
import type { UpdatePaidOff } from '@/types/paidOff.type'

export const updatePaidOff = async (user_id: string, input: UpdatePaidOff) => {
  try {
    await prisma.$transaction(async (prisma) => {
      const updatedData = await prisma.paid_off.update({
        where: { user_id: user_id },
        data: input
      })
      return updatedData
    })
  } catch (error) {
    return error
  }
}
