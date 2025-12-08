/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';
import 'dotenv/config';

const prisma = new PrismaClient();

async function main(){

    // Define Cost Factor
    const rounds = 12;

    // Hash passwords with salt
    const passwordHash = await bcrypt.hash(String(process.env.TESTUSER_PASSWORD), rounds);

    // Seed (update user really) 
    await prisma.user.upsert({
        where: { id: process.env.TESTUSER_ID },
        update: { password: passwordHash },
        create: { username: 'johndude', fullname: 'John Dude', password: passwordHash }
    });

}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e: unknown) => {
        const message = e instanceof Error ? e.message: String(e);
        console.error('Seed failed:',message);
        await prisma.$disconnect();
        process.exit(1);
    });