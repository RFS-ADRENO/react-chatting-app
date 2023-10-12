import { verifyToken } from "../services/auth/token.js";
import { middleware } from "../trpc.js";

export const useVerify = () => {
    return middleware(async ({ ctx, next }) => {
        const cookies: Record<string, string> = (ctx.req.headers.cookie ?? "")
            .split("; ")
            .reduce((acc, cur) => {
                const [key, value] = cur.split("=");

                return {
                    ...acc,
                    [key]: value,
                };
            }, {});

        try {
            const token = cookies["_ut"];

            const payload = await verifyToken(token);

            return next({
                ctx: {
                    req: {
                        cookies,
                    },
                    userId: payload.id,
                },
            });
        } catch (e) {
            throw new Error("Unauthorized");
        }
    });
};
