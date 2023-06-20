/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.tsx"],
    theme: {
        extend: {
            backgroundColor: {
                primary: "#020401",
                btnPrimary: "#075169",
                btnSecondary: "#000000",
            },
            textColor: {
                primary: "#ffffff",
            },
        },
    },
    plugins: [],
};
