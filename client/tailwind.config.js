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
						keyframes: {
							popin: {
								'0%': { opacity: 0, transform: 'translateY(15px)' },
								'100%': { opacity: 1, transform: 'translateY(0)' },
							},
							popout: {
								'0%': { opacity: 1, transform: 'translateY(0)' },
								'100%': { opacity: 0, transform: 'translateY(15px)' },
							}
						},
						animation: {
							popin: 'popin 0.1s ease-out',
							popout: 'popout 0.1s ease-out forwards'
						}
        },
    },
    plugins: [],
};
