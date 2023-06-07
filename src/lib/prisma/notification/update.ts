import prisma from '../../../../client'
import type { UpdateNotification } from '@/types/notification.type'

export const updateNotification = async (input: UpdateNotification) => {
  try {
    const existingData = await prisma.notification.findFirst({
      where: { id: input.id }
    })
    if (!existingData) {
      throw new Error('存在するデータがありません')
    }

    await prisma.notification.update({
      where: { id: input.id },
      data: input
    })

    const updatedData = await prisma.notification.findFirst({
      where: { id: input.id }
    })
    if (!updatedData) {
      throw new Error('データの更新に失敗しました')
    }
    return updatedData
  } catch (error) {
    console.log(error)
    return error
  }
}
