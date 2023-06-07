import prisma from '../../../../client'
import type { CreateNotification } from '@/types/notification.type'

export async function createNotification(input: CreateNotification) {
  try {
    await prisma.$transaction(async (prisma) => {
      const newNotification = await prisma.notification.create({ data: input })
      return newNotification
    })
  } catch (error) {
    return error
  }
}
