import { router } from "../trpc.js";

import { registerRouter } from "../api/auth/register.js";
import { loginRouter } from "../api/auth/login.js";

export const authRouter = router({
    register: registerRouter,
    login: loginRouter,
});
