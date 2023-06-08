import prisma from '../../../../client'

export const deletePaidOff = async (id: number) => {
  try {
    await prisma.$transaction(async () => {
      const deletedData = await prisma.paid_off.delete({
        where: { id: id }
      })
      return deletedData
    })
  } catch (error) {
    return error
  }
}
