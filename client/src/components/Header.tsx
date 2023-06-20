import { Link, useNavigate } from "react-router-dom";
import { useLoginStore } from "../main";

export default function Header() {
    const { loggedIn } = useLoginStore();
    const navigate = useNavigate();

    return (
        <header className="p-2 md:p-5 md:px-10 xl:px-64 flex justify-between items-center sticky top-0">
            <Link to="/">
                <h1 className="text-3xl font-bold">RChat</h1>
            </Link>
            <div className="hidden xl:flex justify-center items-center gap-2 select-none">
                <button
                    className={`py-2 w-32 bg-btnSecondary rounded-md font-semibold ${
                        loggedIn && "invisible"
                    }`}
                    onClick={() => navigate("/login")}
                >
                    Login
                </button>
                <button
                    className="py-2 w-32 bg-btnPrimary rounded-md font-semibold"
                    onClick={() => {
                        if (loggedIn) {
                            navigate("/chat");
                        } else {
                            navigate("/register");
                        }
                    }}
                >
                    Get Started
                </button>
            </div>
        </header>
    );
}
