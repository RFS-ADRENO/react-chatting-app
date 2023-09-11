import express from "express";
import cors from "cors";
import helmet from "helmet";

import {
    router,
    publicProcedureHTTP,
    publicProcedureWS,
    createContext,
} from "./trpc.js";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { applyWSSHandler } from "@trpc/server/adapters/ws";
import { observable } from "@trpc/server/observable";

import { WebSocketServer } from "ws";
import { EventEmitter } from "events";

const ee = new EventEmitter();

const app = express();

app.use(cors());
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
    submit: publicProcedureHTTP.mutation(async ({ ctx }) => {
        await new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(void 0);
            }, 2000);
        });

        return "Hello World!";
    }),
});

app.use("/trpc", createExpressMiddleware({ router: appRouter, createContext }));

const server = app.listen(3000, () => {
    console.log("listening on *:3000");
});

// const io = new Server(server, {
//     cors: {
//         origin: "*",
//         methods: ["GET", "POST"],
//     },
// });

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
