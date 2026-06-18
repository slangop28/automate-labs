/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                cream: "#F0EEE6",
                paper: "#FAF9F5",
                clay: {
                    DEFAULT: "#D97757",
                    deep: "#BD5D3A",
                    soft: "#EBCFC2",
                },
                ink: "#1F1E1B",
                umber: "#6B5D4F",
                line: "#E3DDD0",
            },
            fontFamily: {
                display: ['Fraunces', 'Georgia', 'serif'],
                sans: ['Inter', 'system-ui', 'sans-serif'],
                mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
            },
            boxShadow: {
                soft: "0 1px 2px rgba(31,30,27,0.04), 0 8px 24px -12px rgba(31,30,27,0.12)",
                lift: "0 2px 4px rgba(31,30,27,0.05), 0 18px 40px -16px rgba(31,30,27,0.22)",
                clay: "0 10px 30px -10px rgba(217,119,87,0.45)",
            },
            keyframes: {
                fadeUp: {
                    "0%": { opacity: "0", transform: "translateY(24px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                fadeIn: {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                floaty: {
                    "0%,100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-8px)" },
                },
                shimmer: {
                    "0%": { transform: "translateX(-100%)" },
                    "100%": { transform: "translateX(100%)" },
                },
            },
            animation: {
                "fade-up": "fadeUp .7s cubic-bezier(.19,1,.22,1) forwards",
                "fade-in": "fadeIn .6s ease forwards",
                floaty: "floaty 6s ease-in-out infinite",
            },
        },
    },
    plugins: [],
}
