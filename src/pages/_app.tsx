import type { AppProps } from 'next/app'
import '@styles/styles.css'
import { Fredoka } from "@next/font/google";
import { ThemeProvider } from '@mui/material/styles';
import theme from "@styles/muistyles";

const inter = Fredoka({
    subsets: ["latin"],
    style: "normal",
})

export default function App({ Component, pageProps }: AppProps) {
  return (
        <ThemeProvider theme={theme}>
            <main className={inter.className}>
                <Component {...pageProps} />
            </main>
        </ThemeProvider>
  )
}
