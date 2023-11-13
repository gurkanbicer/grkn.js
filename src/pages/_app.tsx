import { useEffect } from "react";
import type { AppProps } from "next/app";

import "@/styles/styles.scss";
import "@fortawesome/fontawesome-svg-core/styles.css"; 
import { config } from "@fortawesome/fontawesome-svg-core";


export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  
  return <Component {...pageProps} />
}