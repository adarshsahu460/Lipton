import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt'


const prisma = new PrismaClient();

async function login() {
  console.log(await bcrypt.hash("adarsh%123",10));
}

login()