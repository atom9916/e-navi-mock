import prisma from '../../../../client'
import type { CreatePaidOff } from '@/types/paidOff.type'

export const createPaidOff = async (input: CreatePaidOff) => {
  try {
    await prisma.$transaction(async (prisma) => {
      const newPaidOff = await prisma.paid_off.create({
        data: input
      })
      return newPaidOff
    })
  } catch (error) {
    return error
  }
}
