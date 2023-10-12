import { z } from "zod";
import { prisma } from "../../prisma.js";
import bcrypt from "bcrypt";
import { signToken } from "./token.js";

export const credentialsInput = z.object({
		email: z.string().email(),
    password: z.string().regex(/^[a-zA-Z0-9_#@\.\-!]{8,36}$/g),
});

export const login = async (email: string, password: string) => {
    const account = await prisma.account.findUnique({
        where: {
            email,
        },
    });

    if (account == null) throw new Error("User not found");
    const match = await bcrypt.compare(password, account.password);

    if (!match) throw new Error("Invalid password");
		const token	= await signToken({ id: account.id });

    return { account, token };
};

export const register = async (email: string, password: string) => {
		const account = await prisma.account.findUnique({
				where: {
						email,
				},
		});

		if (account != null) throw new Error("Email already in use");

		const hashedPassword = await bcrypt.hash(password, 10);

		const newAccount = await prisma.account.create({
				data: {
						email,
						password: hashedPassword,
				},
		});

		const token = await signToken({ id: newAccount.id });

		return { account: newAccount, token };
};
