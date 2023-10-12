import express from "express";
import cors from "cors";
import helmet from "helmet";

import {
    router,
    publicProcedureHTTP,
    publicProcedureWS,
    createContext,
    protectedProcedureHTTP,
    protectedProcedureWS,
} from "./trpc.js";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { applyWSSHandler } from "@trpc/server/adapters/ws";
import { observable } from "@trpc/server/observable";

import { WebSocketServer } from "ws";
import { EventEmitter } from "events";

import { apiRouter } from "./routes/api.js";
import { prisma } from "./prisma.js";

const ee = new EventEmitter();

const app = express();

app.use(
    cors({
        origin: "http://localhost:5000",
        credentials: true,
    })
);
app.use(helmet());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

const appRouter = router({
    home: publicProcedureHTTP.query(({ ctx }) => {
        return "Hello World!";
    }),
    chat: publicProcedureWS.subscription(() => {
        return observable<string>((emit) => {
            ee.on("chat", (message) => {
                emit.next(message);
            });

            return () => {
                ee.off("chat", (message) => {
                    emit.next(message);
                });
            };
        });
    }),
    submit: protectedProcedureWS.mutation(async ({ ctx }) => {
        await new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(void 0);
            }, 2000);
        });

        return "Hello World!";
    }),
    api: apiRouter,
});

app.use("/trpc", createExpressMiddleware({ router: appRouter, createContext }));

const server = app.listen(3000, async () => {
    await prisma.$connect();
		console.log("connected to mysql");
    console.log("listening on *:3000");
});

applyWSSHandler({
    wss: new WebSocketServer({ server }),
    router: appRouter,
    createContext: ({ req, res }) => {
        return {
            req,
            res,
        };
    },
});

export type AppRouter = typeof appRouter;
