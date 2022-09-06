import "../styles/globals.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
// import type { AppProps } from "next/app";
// import { ThemeProvider } from "theme-ui"; //Testing with theme-ui
import Theme from "../appConfiguration/chakraTheme";
import PlayerLayout from "../components/container/PlayerLayout";

const theme = extendTheme({ Theme });

function MyApp({ Component, pageProps }: any) {
  return (
    <ChakraProvider theme={theme} resetCSS={true}>
      {Component?.authPage ? (
        <Component {...pageProps} />
      ) : (
        <PlayerLayout>
          <Component {...pageProps} />
        </PlayerLayout>
      )}
    </ChakraProvider>
  );
}

export default MyApp;
