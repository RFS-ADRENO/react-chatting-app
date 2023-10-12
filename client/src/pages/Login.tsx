// import React from "react";

import { useLoginStore } from "../stores/login.store";
import { Link, Navigate } from "react-router-dom";
import { trpc } from "../trpc";

export default function Login() {
    const { loggedIn } = useLoginStore();
    const { mutateAsync } = trpc.api.auth.login.useMutation();

    function handleLogin(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const email = (e.currentTarget.elements[0] as HTMLInputElement).value;
        const password = (e.currentTarget.elements[1] as HTMLInputElement)
            .value;

        mutateAsync({ email, password })
            .then(() => {
                window.localStorage.setItem("login", "true");
                window.location.href = "/";
            })
            .catch(() => {
                alert("Error logging in");
            });
    }

    if (loggedIn == undefined) return null;
    if (loggedIn) return <Navigate to="/chat" />;

    return (
        <div className="flex justify-center items-center h-[100svh]">
            <div className="w-5/6 md:w-[540px] bg-slate-900 border border-slate-600 rounded-md px-4 py-10 flex justify-center items-center flex-col gap-5">
                <h1 className="text-2xl text-center font-semibold">
                    Login to your account
                </h1>
                <form className="flex flex-col gap-4 mt-4 w-11/12" onSubmit={handleLogin}>
                    <input
                        className="py-2 px-4 rounded-md bg-slate-200"
                        type="email"
                        placeholder="Email"
                        required
                    />
                    <input
                        className="py-2 px-4 rounded-md bg-slate-200"
                        type="password"
                        placeholder="Password"
                        required
                    />

                    <button className="py-2 px-4 rounded-md bg-btnPrimary text-white font-semibold">
                        Login
                    </button>
                </form>

                <p className="text-sm text-center">
                    Don't have an account?{" "}
                    <Link
                        className="text-blue-700 hover:underline"
                        to="/register"
                    >
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
}
