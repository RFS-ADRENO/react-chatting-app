// import React from "react";

import { trpc } from "../trpc";

import { Link } from "react-router-dom";

export default function Register() {
    const { mutateAsync } = trpc.api.auth.register.useMutation();

    function handleRegister(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const email = (e.currentTarget.elements[0] as HTMLInputElement).value;
        const password = (e.currentTarget.elements[1] as HTMLInputElement)
            .value;
        const confirmPassword = (
            e.currentTarget.elements[2] as HTMLInputElement
        ).value;

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        mutateAsync({ email, password })
            .then(() => {
								window.localStorage.setItem("login", "true");
								window.location.href = "/";
						})
            .catch(() => {
								alert("Error creating account");
						});
    }

    return (
        <div className="flex justify-center items-center h-[100svh]">
            <div className="w-5/6 md:w-[540px] bg-slate-900 border border-slate-600 rounded-md px-4 py-10 flex justify-center items-center flex-col gap-5">
                <h1 className="text-2xl text-center font-semibold">
                    Create new account
                </h1>
                <form
                    className="flex flex-col gap-4 mt-4 w-11/12 text-slate-500"
                    onSubmit={handleRegister}
                >
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
                    <input
                        className="py-2 px-4 rounded-md bg-slate-200"
                        type="password"
                        placeholder="Confirm Password"
                        required
                    />

                    <button className="py-2 px-4 rounded-md bg-btnPrimary text-white font-semibold">
                        Register
                    </button>
                </form>

                <p className="text-sm text-center">
                    Already have an account?{" "}
                    <Link className="text-blue-700 hover:underline" to="/login">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}
