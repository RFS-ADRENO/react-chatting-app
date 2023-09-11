import { useEffect } from "react";
import { trpc } from "../trpc";

import Header from "../components/Header";

import { useLoginStore } from "../stores/login.store";

function App() {
    const submitMutation = trpc.submit.useMutation();
    trpc.chat.useSubscription(undefined, {
        onData(data) {
            console.log(data);
        },
    });
    useEffect(() => {
        submitMutation.mutate();
    }, []);

    const { loggedIn } = useLoginStore();
    return (
        <>
            <Header />
            {submitMutation.isLoading && <div>loading...</div>}
            <section className="h-[720px] p-2 md:p-10 xl:px-64">
                <p className="text-4xl">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Rerum a ut deleniti cupiditate itaque facilis animi cum
                    dolores molestiae ad minus rem obcaecati, odio pariatur enim
                    sequi delectus? Ipsum, sunt!
                </p>
                <br />
                <a
                    className="text-2xl font-semibold text-blue-700 hover:underline"
                    href={loggedIn ? "/chat" : "/login"}
                >
                    {loggedIn ? "Start chatting" : "Login"}
                </a>
                <br />
                <br />
                <button
                    className="text-2xl font-semibold text-red-700 hover:underline"
                    onClick={() => {
                        let token = localStorage.getItem("token");
                        if (token) {
                            localStorage.removeItem("token");
                            window.location.reload();
                        } else {
                            localStorage.setItem("token", "token");
                            window.location.reload();
                        }
                    }}
                >
                    Add/Remove token
                </button>
            </section>
        </>
    );
}

export default App;
