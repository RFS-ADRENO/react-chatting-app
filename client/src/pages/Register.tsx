// import React from "react";

import { Link } from "react-router-dom";

export default function Register() {
    return (
        <div className="flex justify-center items-center h-[100svh]">
            <div className="w-5/6 md:w-[540px] bg-slate-900 border border-slate-600 rounded-md px-4 py-10 flex justify-center items-center flex-col gap-5">
                <h1 className="text-2xl text-center font-semibold">
                    Create new account
                </h1>
                <form className="flex flex-col gap-4 mt-4 w-11/12 text-slate-500">
                    <input
                        className="py-2 px-4 rounded-md bg-slate-200"
                        type="email"
                        placeholder="Email"
                    />
                    <input
                        className="py-2 px-4 rounded-md bg-slate-200"
                        type="password"
                        placeholder="Password"
                    />
                    <input
                        className="py-2 px-4 rounded-md bg-slate-200"
                        type="password"
                        placeholder="Confirm Password"
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
