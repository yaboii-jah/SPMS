import 'dotenv/config';
import { PrismaClient } from "../generated/prisma/index.js";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const adapter = new PrismaMariaDb({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  password : process.env.DB_PASSWORD,
  port : process.env.DB_PORT,
  
});

const prisma = new PrismaClient({ adapter });

export default prisma