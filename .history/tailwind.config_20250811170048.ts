// tailwind.config.ts
import type { Config } from 'tailwindcss'
import scrollbar from 'tailwind-scrollbar'

const config: Config = {
    content: [
        './src/**/*.{js,ts,jsx,tsx}',
    ],
    plugins: [

    ],
}

export default config

module.exports = {
    content: [
        './src/**/*.{js,jsx,ts,tsx,html}',
        './index.html',
    ],
    theme: {
        extend: {
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
            },
            animation: {
                fadeIn: 'fadeIn 0.3s ease-in forwards',
            },
            boxShadow: {
                logout: '1px 1px 2px rgba(0, 0, 0, 0.1)',
            },
            fontFamily: {
                questrial: ['Questrial', 'sans-serif'],
                raleway: ['Raleway', 'sans-serif'],
            },
        },
    },
    plugins: [scrollbar({ nocompatible: true }),],
    corePlugins: {
        responsive: true, // keep true unless you want to disable responsiveness completely
    },
}