import prisma from '../../../../client'
import type { CreateNotification } from '@/types/notification.type'

export async function createNotification(input: CreateNotification) {
  try {
    await prisma.notification.create({ data: input })
    const newNotification = await prisma.notification.findFirst({
      orderBy: { id: 'desc' }
    })
    if (newNotification === undefined || null) {
      throw new Error('登録したデータが見つかりませんでした')
    }
    return newNotification
  } catch (error) {
    console.error(error)
    return error
  }
}
