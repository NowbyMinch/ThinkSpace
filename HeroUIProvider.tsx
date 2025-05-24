import * as React from "react";
import type { AppProps } from 'next/app';
import "./globals.css"; // (optional) your global styles

// 1. import `HeroUIProvider` component
import {HeroUIProvider} from "@heroui/react";

function App({ Component, pageProps }: AppProps) {
  // 2. Wrap HeroUIProvider at the root of your app
  
  return (
    <HeroUIProvider>
        <Component {...pageProps} />
    </HeroUIProvider>
  );
}