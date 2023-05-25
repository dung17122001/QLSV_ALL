/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                'sv-blue-1': '#F3F9FF',
                'sv-blue-2': '#DEF0FF',
                'sv-blue-3': '#C6E4FF',
                'sv-blue-4': '#47A9FF',
                'sv-blue-5': '#004078',
                'sv-green-1': '#66DA53',
                'sv-text-1': '#8B7B8B',
                'sv-text-2': '#008080',
                'sv-yellow-1': '#FFEFD5',
                'sv-yellow-2': '#CD853F',
            },
            dropShadow: {
                'sv-login': '0 0 20px rgba(71, 169, 255, 0.39)',
            },
            borderRadius: {
                'sv-login-input': '25px',
            },
        },
    },

    plugins: [],
};
