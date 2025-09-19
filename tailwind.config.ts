import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "node_modules/daisyui/dist/**/*.js",
    "node_modules/react-daisyui/dist/**/*.js",
  ],

  theme: {
    extend: {
      fontFamily: {
        conthrax: ["Conthrax", "sans-serif"],
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        card: 'var(--card)',
        cardForeground: 'var(--card-foreground)',
        popover: 'var(--popover)',
        popoverForeground: 'var(--popover-foreground)',
        primary: 'var(--primary)',
        primaryForeground: 'var(--primary-foreground)',
        secondary: 'var(--secondary)',
        secondaryForeground: 'var(--secondary-foreground)',
        muted: 'var(--muted)',
        mutedForeground: 'var(--muted-foreground)',
        accent: 'var(--accent)',
        accentForeground: 'var(--accent-foreground)',
        destructive: 'var(--destructive)',
        destructiveForeground: 'var(--destructive-foreground)',
        mono: 'var(--mono)',
        monoForeground: 'var(--mono-foreground)',
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
        // existing custom colors
        "muted-old": '#f3f4f6',
        "dark-ocean": "#00161D",
        "cyan-neon": "#03FAFA",
        "deep-teal": "#006787"
      },

      borderRadius: {
        xl: 'calc(var(--radius) + 4px)',
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontSize: {
        '2sm': ['0.8125rem', { lineHeight: 'calc(1.075 / 0.8125)' }],
        '2xs': ['0.6875rem', { lineHeight: 'calc(0.825 / 0.6875)' }],
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'collapsible-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-collapsible-content-height)' },
        },
        'collapsible-up': {
          from: { height: 'var(--radix-collapsible-content-height)' },
          to: { height: '0' },
        },
        'caret-blink': {
          '0%, 70%, 100%': { opacity: '1' },
          '20%, 50%': { opacity: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'collapsible-down': 'collapsible-down 0.2s ease-out',
        'collapsible-up': 'collapsible-up 0.2s ease-out',
        'caret-blink': 'caret-blink 1.25s ease-out infinite',
      },
      backgroundImage: {
        'header': "url('/images/bg-header.svg')",
      }
    }
  },
  daisyui: {
		themes: ["light"]
	},
  plugins: [
    require("daisyui"),
    require('tailwindcss-animate'),
    require('tailwindcss/plugin')(function ({ addBase }: any) {
      addBase({
        ':root': {
          '--background': 'oklch(1 0 0)',
          '--foreground': 'oklch(27.4% 0.006 286.033)',
          '--card': 'oklch(1 0 0)',
          '--card-foreground': 'oklch(27.4% 0.006 286.033)',
          '--popover': 'oklch(1 0 0)',
          '--popover-foreground': 'oklch(27.4% 0.006 286.033)',
          '--primary': '#1379f0',
          '--primary-foreground': 'oklch(1 0 0)',
          '--secondary': 'oklch(96.7% 0.003 264.542)',
          '--secondary-foreground': 'oklch(44.6% 0.03 256.802)',
          '--muted': 'oklch(96.7% 0.003 264.542)',
          '--muted-foreground': 'oklch(70.5% 0.015 286.067)',
          '--accent': 'oklch(96.7% 0.003 264.542)',
          '--accent-foreground': 'oklch(21% 0.006 285.885)',
          '--destructive': 'oklch(57.7% 0.245 27.325)',
          '--destructive-foreground': 'oklch(1 0 0)',
          '--mono': 'oklch(14.1% 0.005 285.823)',
          '--mono-foreground': 'oklch(1 0 0)',
          '--border': 'oklch(94% 0.004 286.32)',
          '--input': 'oklch(92% 0.004 286.32)',
          '--ring': 'oklch(87.1% 0.006 286.286)',
          '--radius': '0.5rem',
        },
        // '.dark': {
        //   '--background': 'oklch(14.1% 0.005 285.823)',
        //   '--foreground': 'oklch(98.5% 0 0)',
        //   '--card': 'oklch(14.1% 0.005 285.823)',
        //   '--card-foreground': 'oklch(98.5% 0 0)',
        //   '--popover': 'oklch(14.1% 0.005 285.823)',
        //   '--popover-foreground': 'oklch(98.5% 0 0)',
        //   '--primary': '#1379f0',
        //   '--primary-foreground': 'oklch(1 0 0)',
        //   '--secondary': 'oklch(27.4% 0.006 286.033)',
        //   '--secondary-foreground': 'oklch(70.5% 0.015 286.067)',
        //   '--muted': 'oklch(21% 0.006 285.885)',
        //   '--muted-foreground': 'oklch(55.2% 0.016 285.938)',
        //   '--accent': 'oklch(21% 0.006 285.885)',
        //   '--accent-foreground': 'oklch(98.5% 0 0)',
        //   '--destructive': 'oklch(57.7% 0.245 27.325)',
        //   '--destructive-foreground': 'oklch(1 0 0)',
        //   '--mono': 'oklch(87.1% 0.006 286.286)',
        //   '--mono-foreground': 'oklch(0 0 0)',
        //   '--border': 'oklch(27.4% 0.006 286.033)',
        //   '--input': 'oklch(27.4% 0.006 286.033)',
        //   '--ring': 'oklch(27.4% 0.006 286.033)',
        // },
      });
    }),
  ],
};
export default config;
