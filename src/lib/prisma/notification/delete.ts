import prisma from '../../../../client'
import type { DeleteNotification } from '@/types/notification.type'

export async function deleteNotification(input: DeleteNotification) {
  try {
    if (!input.id) {
      throw new Error('idを指定してください')
    }
    await prisma.notification.delete({
      where: { id: input.id }
    })
  } catch (error) {
    console.error(error)
    return error
  }
}
