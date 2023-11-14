import type { AppProps } from "next/app";

import "@/styles/styles.scss";
import "@fortawesome/fontawesome-svg-core/styles.css"; 

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}