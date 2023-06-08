import prisma from '../../../../client'

export const getAllPaidOff = async () => {
  try {
    await prisma.$transaction(async (prisma) => {
      const allPaidOff = await prisma.paid_off.findMany()
      if (allPaidOff.length === 0) {
        throw new Error('有給データが存在しません')
      }
      return allPaidOff
    })
  } catch (error) {
    return error
  }
}

export const getPaidOffByUserId = async (user: string) => {
  try {
    await prisma.$transaction(async (prisma) => {
      const usersPaidOff = await prisma.paid_off.findFirst({
        where: { user_id: user }
      })
      if (usersPaidOff === null) {
        throw new Error('user_emailが間違っています')
      }
      return usersPaidOff
    })
  } catch (error) {
    return error
  }
}
