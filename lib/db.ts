
// declare global {
//     let prisma: PrismaClient | undefined;
// }

import { PrismaClient } from "./generated/prisma";

// export const db = globalThis.prisma || new PrismaClient();

// if(process.env.NODE_ENV != "production") globalThis.prisma = db

export const db = new PrismaClient();
