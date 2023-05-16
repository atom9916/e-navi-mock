import { createUser, updateUser } from '../functions-with-context'
import { prismaMock } from '../singleton'

test('should create new user', async () => {
  const user = {
    id: 1,
    name: 'John',
    email: 'john@prisma.io',
    password: 'john',
    departmentId: 1
  }

  prismaMock.user.create.mockResolvedValue(user)

  await expect(createUser(user)).resolves.toEqual({
    id: 1,
    name: 'John',
    email: 'john@prisma.io',
    password: 'john',
    departmentId: 1
  })
})

test('should update user name', async () => {
  const user = {
    id: 1,
    name: 'John Doe',
    email: 'john@prisma.io',
    password: 'John',
    departmentId: 1
  }

  prismaMock.user.update.mockResolvedValue(user)

  await expect(updateUser(user)).resolves.toEqual({
    id: 1,
    name: 'John Doe',
    email: 'john@prisma.io',
    password: 'John',
    departmentId: 1
  })
})
