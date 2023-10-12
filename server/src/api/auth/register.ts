import { publicProcedureHTTP } from "../../trpc.js";
import { credentialsInput, register } from "../../services/auth/account.js";
import { TRPCError } from "@trpc/server";

const _1YEAR = 365 * 24 * 60 * 60;

export const registerRouter = publicProcedureHTTP
    .input(credentialsInput)
    .mutation(async ({ ctx, input }) => {
        const { email, password } = input;

        try {
            const { token } = await register(email, password);

            ctx.res.setHeader(
                "Set-Cookie",
                `_ut=${token}; Path=/; HttpOnly; ${
                    process.env.NODE_ENV == "production" ? "Secure;" : ""
                } SameSite=${
                    process.env.NODE_ENV == "production" ? "None" : "Lax"
                }; Max-Age=${_1YEAR};`
            );

						return true;
        } catch (e) {
            if (e instanceof Error) {
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: e.message,
                });
            }

            throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: "Something went wrong",
            });
        }
    });
