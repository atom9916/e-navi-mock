import prisma from '../../client'
import type { CreateNotification, UpdateNotification } from '@/types/notification.type'

export async function createNotification(notification: CreateNotification) {
  return await prisma.notification.create({
    data: notification
  })
}

export async function updateNotification(notification: UpdateNotification) {
  return await prisma.notification.update({
    where: { id: notification.id },
    data: notification
  })
}
