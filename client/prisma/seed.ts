/**
 * This file provides our Prisma schema initial seeds..
 ***/
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient()

const userData: Prisma.UserCreateInput[] = [
  {
    name: 'Tom Smith',
    email: 'mail@tecsmith.info',
    role: 'SYSTEMS'
  },
  {
    name: 'Dick Tracy',
    email: 'mail@tecsmith.eu',
    role: 'VISITOR'
    // posts: {
    //     create: [
    //         {
    //             title: 'Ask a question about Prisma on GitHub',
    //             content: 'https://www.github.com/prisma/prisma/discussions',
    //             published: true,
    //         },
    //         {
    //             title: 'Prisma on YouTube',
    //             content: 'https://pris.ly/youtube',
    //         },
    //     ],
    // },
  }
]

async function main() {
  console.log(`Start seeding ...`)
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    })
    console.log(`Created user with id: ${user.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

/***
  @COPYRIGHT (c) 2024. Thomas EC. Smith (https://www.TECSmith.uk). All rights reserved.
****/
