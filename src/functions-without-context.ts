import prisma from './client'

interface CreateUser {
  name: string
  email: string
  password: string
  departmentId: number
}

export async function createUser(user: CreateUser) {
  return await prisma.user.create({
    data: user
  })
}

interface UpdateUser {
  id: number
  name: string
  email: string
  password: string
  departmentId: number
}

export async function updateUser(user: UpdateUser) {
  return await prisma.user.update({
    where: { id: user.id },
    data: user
  })
}
