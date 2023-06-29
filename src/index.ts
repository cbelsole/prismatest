import { PrismaClient } from "@prisma/client";
async function start() {
  const prisma = new PrismaClient();

  const testDecimal = await prisma.decimalTest.create({
    data: { test_decimal: 0.5 },
  });
  console.log(testDecimal);

  const testDecimals = await prisma.decimalTest.findMany();
  console.log(testDecimals);
}

start();
