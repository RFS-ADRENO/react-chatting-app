import { initTRPC, type inferAsyncReturnType } from "@trpc/server";
import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import type { NodeHTTPCreateContextFnOptions } from "@trpc/server/adapters/node-http";
import type { IncomingMessage } from "http";
import type ws from "ws";
import type { Request, Response } from "express";
import { useVerify } from "./middlewares/useVerify.js";

export const createContext = async ({
    req,
    res,
}:
    | CreateExpressContextOptions
    | NodeHTTPCreateContextFnOptions<IncomingMessage, ws>) => {
    return {
        req,
        res,
    };
};

const t = initTRPC
    .context<inferAsyncReturnType<typeof createContext>>()
    .create();

export const router = t.router;
export const publicProcedure = t.procedure;
export const middleware = t.middleware;

export const publicProcedureHTTP = t.procedure.use(({ ctx, next }) => {
    return next({
        ctx: {
            req: ctx.req as Request,
            res: ctx.res as Response,
        },
    });
});
export const protectedProcedureHTTP = publicProcedureHTTP.use(useVerify());

export const publicProcedureWS = t.procedure.use(({ ctx, next }) => {
    return next({
        ctx: {
            req: ctx.req as IncomingMessage,
            res: ctx.res as ws,
        },
    });
});
export const protectedProcedureWS = publicProcedureWS.use(useVerify());
