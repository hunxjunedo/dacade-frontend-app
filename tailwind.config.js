/** @type {import('tailwindcss').Config} */
const lineClamp = require("@tailwindcss/line-clamp");

module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",

        // Or if using `src` directory:
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: false, // or 'media' or 'class'
    safelist: [
        "grid-cols-1",
        "grid-cols-2",
        "grid-cols-3",
        "grid-cols-4",
        "grid-cols-5",
        "gap-0",
        "gap-1",
        "gap-2",
        "gap-3",
        "gap-y-3",
        "gap-y-0",
    ],
    theme: {
        extend: {
            colors: {
                current: "currentColor",
                "primary-dark": "#205ED7",
                primary: "#1B66F8",
                secondary: "#F3F4F6",
                orange: "rgba(255, 187, 1, 0.17)",
                "orange-light": "rgba(173, 87, 0, 1)",
                "blue-lighter": "#F8FAFF",
                "blue-light": "#DDE9FF",
                "gray-light": "#1b66f8",
                theme: {
                    primary: "var(--tm-primary)",
                    secondary: "var(--tm-secondary)",
                    text: "var(--tm-text)",
                    highlight: "var(--tm-highlight)",
                    accent: "var(--tm-accent)",
                    muted: "var(--tm-muted)",
                },
            },
            spacing: {
                3.75: "0.9375rem",
                4.5: "1.125rem",
                5.5: "1.375rem",
                5.75: "1.4375rem",
                6.5: "1.625rem",
                7.5: "1.875rem",
                8.5: "2.125rem",
                10.5: "2.625rem",
                10.75: "2.6875rem",
                13: "3.25rem",
                15: "3.75rem",
                16.25: "4.25rem",
                17: "4.5rem",
                62: "15.5rem",
                64: "16rem",
                96.5: "25.5rem",
                98: "28rem",
                99: "45.625rem",
            },
            borderRadius: {
                DEFAULT: "0.25rem",
                "3.5xl": "1.75rem",
            },
            borderWidth: {
                DEFAULT: "1px",
            },
            boxShadow: {
                DEFAULT:
                    "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
                md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
                none: "none",
            },
            fontSize: {
                xxs: ["11px", { lineHeight: "1.2rem" }],
                ".5xl": ["1.375rem", { lineHeight: "2rem" }],
                "2xl": ["1.5rem", { lineHeight: "2rem" }],
                "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
                "4.5xl": ["2.5rem", { lineHeight: "1" }],
                "6.5xl": ["4rem", { lineHeight: "1" }],
                "7.5xl": ["5rem", { lineHeight: "1" }],
                "7.75xl": ["5.75rem", { lineHeight: "1" }],
            },
            maxWidth: {
                "3xs": "5rem",
                "2xs": "10rem",
                ".5xs": "14em",
                ".5xl": "40rem",
                prose: "100%",
                sidebar: "340px",
            },
            maxHeight: {
                "3xs": "5rem",
                "2xs": "10rem",
                ".5xs": "14em",
                xs: "20rem",
                sm: "24rem",
                md: "28rem",
                lg: "32rem",
                xl: "36rem",
                ".5xl": "40rem",
                "2xl": "42rem",
                "3xl": "48rem",
                "4xl": "56rem",
                "5xl": "64rem",
                "6xl": "72rem",
                "7xl": "80rem",
                "7.1xl": "80.5rem",
                "8xl": "88rem",
                prose: "100%",
                sidebar: "340px",
            },
            minHeight: {
                "3xs": "5rem",
                "2.5xs": "7.5rem",
                "2xs": "10rem",
                ".5xs": "14em",
                xs: "20rem",
                sm: "24rem",
                md: "28rem",
                lg: "32rem",
                xl: "36rem",
                "2xl": "42rem",
                "3xl": "48rem",
                "4xl": "56rem",
                "5xl": "64rem",
                "6xl": "72rem",
                "7xl": "80rem",
            },
            minWidth: {
                "3xs": "5rem",
                "2xs": "10rem",
                ".5xs": "14em",
                xs: "20rem",
                sm: "24rem",
                md: "28rem",
                lg: "32rem",
                xl: "36rem",
                "2xl": "42rem",
                "3xl": "48rem",
                "4xl": "56rem",
                "5xl": "64rem",
                "6xl": "72rem",
                "7xl": "80rem",
            },
            outline: {
                none: ["2px solid transparent", "2px"],
                white: ["2px dotted white", "2px"],
                black: ["2px dotted black", "2px"],
            },

            width: (theme) => ({
                "10.5/12": "90%",
            }),
            zIndex: {
                99: "99",
                999: "999",
            },
        },
    },
    plugins: [lineClamp],
};
