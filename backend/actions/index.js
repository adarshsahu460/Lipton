
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function login() {
  await prisma.user.deleteMany()
  await prisma.admin.deleteMany()
  await prisma.adminOTP.deleteMany()
  await prisma.userOTP.deleteMany()
}

login()