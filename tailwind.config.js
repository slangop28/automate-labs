/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                obsidian: {
                    DEFAULT: "#050304",
                    50: "#0F0B0D",
                    100: "#0A0608",
                    200: "#070405",
                    300: "#050304",
                    400: "#030203",
                    900: "#000000",
                },
                surface: {
                    DEFAULT: "#0A0608",
                    card: "rgba(15, 11, 13, 0.75)",
                    glass: "rgba(255, 183, 197, 0.03)",
                    border: "rgba(255, 183, 197, 0.12)",
                    borderHover: "rgba(255, 183, 197, 0.30)",
                },
                // Rose Gold / Cherry Blossom Palette
                sakura: {
                    DEFAULT: "#FFB7C5",
                    50: "#FFF0F3",
                    100: "#FFE0E8",
                    200: "#FFB7C5",
                    300: "#E6A0B0",
                    400: "#CC8895",
                    500: "#B0707E",
                    600: "#8C5460",
                },
                rose: {
                    gold: "#E6A0B0",
                    pearl: "#FDF8F9",
                    muted: "#E2C2C9",
                    soft: "#B89EA5",
                    deep: "#7A4F58",
                },
                zinc: {
                    muted: "#71717A",
                    light: "#A1A1AA",
                    bright: "#E4E4E7",
                }
            },
            fontFamily: {
                sans: ['"Plus Jakarta Sans"', 'Outfit', 'system-ui', 'sans-serif'],
                display: ['"Cormorant Garamond"', '"Playfair Display"', 'serif'],
                serif: ['"Cormorant Garamond"', '"Playfair Display"', 'serif'],
                body: ['"Plus Jakarta Sans"', 'Outfit', 'sans-serif'],
                mono: ['"JetBrains Mono"', 'monospace'],
            },
            boxShadow: {
                'glow-sm':     '0 0 15px rgba(255, 183, 197, 0.18)',
                'glow-md':     '0 0 30px rgba(255, 183, 197, 0.28)',
                'glow-lg':     '0 0 60px rgba(255, 183, 197, 0.38)',
                'glow-rose':   '0 0 40px rgba(230, 160, 176, 0.35)',
                'glow-pearl':  '0 0 30px rgba(253, 248, 249, 0.15)',
                'glass':       '0 8px 32px 0 rgba(0, 0, 0, 0.45)',
            },
            backgroundImage: {
                // Rose gold gradients
                'gradient-sakura':  'linear-gradient(135deg, #FFB7C5 0%, #E6A0B0 50%, #FDF8F9 100%)',
                'gradient-rose':    'linear-gradient(135deg, #FDF8F9 0%, #FFB7C5 50%, #E6A0B0 100%)',
                'radial-glow':      'radial-gradient(circle at 50% 0%, rgba(255, 183, 197, 0.18) 0%, transparent 70%)',
                'gradient-conic':   'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
                'radial-vignette':  'radial-gradient(ellipse at center, var(--tw-gradient-stops))',
                'radial-rose':      'radial-gradient(ellipse at 50% 0%, rgba(255, 183, 197, 0.25) 0%, transparent 65%)',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
                    '50%':      { transform: 'translateY(-12px) rotate(1deg)' },
                },
                pulseSlow: {
                    '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
                    '50%':      { opacity: '0.8', transform: 'scale(1.05)' },
                },
                shimmer: {
                    '0%':   { transform: 'translateX(-100%)' },
                    '100%': { transform: 'translateX(200%)' },
                },
                petalFall: {
                    '0%':   { transform: 'translateY(-10px) rotate(0deg)', opacity: '0' },
                    '10%':  { opacity: '1' },
                    '90%':  { opacity: '0.6' },
                    '100%': { transform: 'translateY(100vh) rotate(720deg)', opacity: '0' },
                },
            },
            animation: {
                'float':       'float 6s ease-in-out infinite',
                'pulse-slow':  'pulseSlow 4s ease-in-out infinite',
                'shimmer':     'shimmer 2.5s infinite',
                'petal-fall':  'petalFall 8s ease-in infinite',
            },
        },
    },
    plugins: [],
}
