import { authRouter } from "./auth.js";
import { router } from "../trpc.js";

export const apiRouter = router({
		auth: authRouter,
});
