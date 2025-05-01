import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        sans: ['"Untitled Sans"', '"Yu Gothic Medium"', '"游ゴシック Medium"', 'YuGothic', '"游ゴシック体"', '"hiragino-kaku-gothic-pron"', '"Hiragino Kaku Gothic ProN"', '"ヒラギノ角ゴ ProN"', '"Noto Sans JP"', 'Meiryo', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
