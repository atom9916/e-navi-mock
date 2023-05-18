import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.department.create({
    data: {
      name: '人事部'
    }
  })

  await prisma.user.create({
    data: {
      name: 'Alice',
      email: 'alice@prisma.io',
      password: 'alice2023',
      departmentId: 1
    }
  })

  const allUsers = await prisma.user.findMany()

  console.dir(allUsers, { depth: null })

  // const post = await prisma.post.update({
  //   where: { id: 1 },
  //   data: { published: true }
  // })

  // await prisma.user.create({
  //   data: {
  //     name: 'Alice',
  //     email: 'alice@prism.io',
  //     posts: {
  //       create: { title: 'Hello World' }
  //     },
  //     profile: {
  //       create: { bio: 'I like turtles' }
  //     }
  //   }
  // })

  // const allUsers = await prisma.user.findMany({
  //   include: {
  //      posts: true
  //      profile: true
  //   }
  // })
}

// main()
//   .then(async () => {
//     await prisma.$disconnect()
//   })
//   .catch(async (e) => {
//     console.error(e)
//     await prisma.$disconnect()
//     process.exit(1)
//   })
