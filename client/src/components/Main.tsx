import React, { useEffect } from "react";
import { useLoginStore } from "../main";

interface Props {
    children: React.ReactNode;
}

export default function Main({ children }: Props) {
    const { setLoggedIn } = useLoginStore();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setLoggedIn(true);
        }
    }, []);

    return (
        <main className="bg-primary text-primary font-mono min-h-[100svh]">
            {children}
        </main>
    );
}
