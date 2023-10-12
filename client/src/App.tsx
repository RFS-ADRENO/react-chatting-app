import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { createWSClient, httpBatchLink, wsLink, splitLink } from "@trpc/client";

import { trpc } from "./trpc.ts";

import Main from "./components/Main.tsx";

import NotFound from "./pages/NotFound.tsx";

import Home from "./pages/Home.tsx";
import Chat from "./pages/Chat.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";

import { useLoginStore } from "./stores/login.store.ts";

function App() {
    const [queryClient] = useState(() => new QueryClient());
    const [trpcClient] = useState(() =>
        trpc.createClient({
            links: [
                splitLink({
                    condition: (op) => {
                        return op.path !== "api.auth.login" && op.path !== "api.auth.register" && op.path !== "submit";
                    },
                    true: wsLink({
                        client: createWSClient({
                            url: import.meta.env.VITE_WS_URL as string,
                        }),
                    }),
                    false: httpBatchLink({
                        url: import.meta.env.VITE_API_URL as string,
												fetch: (input, opt) => {
														return fetch(input, {
																...opt,
																credentials: "include",
														});
												}
                    }),
                }),
            ],
        })
    );
    const { setLoggedIn } = useLoginStore();

    useEffect(() => {
        const login = localStorage.getItem("login");
        setLoggedIn(login == "true");
    }, []);

    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <Main>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/chat" element={<Chat />} />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </Main>
                </BrowserRouter>
            </QueryClientProvider>
        </trpc.Provider>
    );
}

export default App;
