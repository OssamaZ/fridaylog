import { prisma } from ".";

(async () => {
  try {
    await prisma.example.create({
      data: { name: "example-1" },
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
