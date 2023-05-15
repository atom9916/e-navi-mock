import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // await prisma.tag.create({
  //   data: {
  //     name: 'greet',
  //     posts: {
  //       connect: { id: 1 }
  //     }
  //   }
  // })
  // const allPosts = await prisma.post.findMany({
  //   include: { tags: true }
  // })
  // console.dir(allPosts, {depth: null})
  // const post = await prisma.post.update({
  //   where: { id: 1 },
  //   data: { published: true }
  // })
  // console.log(post)
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
  //     posts: true,
  //     profile: true
  //   }
  // })
  // console.dir(allUsers, { depth: null })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    // process.exit(1)
  })
