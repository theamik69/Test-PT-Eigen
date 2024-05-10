import { PrismaClient } from '@prisma/client';
import { users } from '../data/users';
import { books } from '../data/books';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({
    data: users,
  });

  await prisma.book.createMany({
    data: books,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
