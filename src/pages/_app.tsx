import type { AppProps } from 'next/app'
import '@styles/styles.css'
import { Jost } from "@next/font/google";

const inter = Jost({
    subsets: ["latin"],
    style: "normal",
})

export default function App({ Component, pageProps }: AppProps) {
  return (
        <main className={inter.className}>
            <Component {...pageProps} />
        </main>
  )
}
