import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { create } from "zustand";

import "./scss/index.scss";

import Main from "./components/Main.tsx";

import App from "./App.tsx";
import NotFound from "./pages/NotFound.tsx";

const Chat = lazy(() => import("./pages/Chat.tsx"));
const Login = lazy(() => import("./pages/Login.tsx"));
const Register = lazy(() => import("./pages/Register.tsx"));

interface ILoginStore {
    loggedIn: boolean;
    setLoggedIn: (loggedIn: boolean) => void;
}

export const useLoginStore = create<ILoginStore>()((set) => ({
    loggedIn: false,
    setLoggedIn: (loggedIn: boolean) => set({ loggedIn }),
}));

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <BrowserRouter>
            <Main>
                <Routes>
                    <Route path="/" element={<App />} />
                    <Route
                        path="/login"
                        element={
                            <Suspense>
                                <Login />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/register"
                        element={
                            <Suspense>
                                <Register />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/chat"
                        element={
                            <Suspense>
                                <Chat />
                            </Suspense>
                        }
                    />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Main>
        </BrowserRouter>
    </React.StrictMode>
);
