import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="flex justify-center items-center flex-col h-[100svh]">
            <h1 className="font-bold text-3xl">404</h1>
            <p className="text-lg">
                We couldn't find the page you were looking for.
            </p>
            <Link to="/" className="text-lg text-blue-500 hover:underline mt-5">
                Return to Home
            </Link>
        </div>
    );
}
