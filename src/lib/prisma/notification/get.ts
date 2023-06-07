import prisma from '../../../../client'

export const getAllNotification = async () => {
  try {
    const allNotification = await prisma.notification.findMany()
    if (allNotification === undefined || null) {
      throw new Error('お知らせデータの取得に失敗しました')
    }
    console.log(`allNotification ${allNotification}`)
    return allNotification
  } catch (error) {
    return error
  }
}
