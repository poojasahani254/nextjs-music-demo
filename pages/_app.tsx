import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import Theme from "../appConfiguration/chakraTheme";
import PlayerLayout from "../components/container/PlayerLayout";
import { StoreProvider } from "easy-peasy";
import { useStore } from "react-redux";
import { wrapper } from "../lib/store";
import Script from "next/script";
import "../styles/globals.css";
const theme = extendTheme({ ...Theme });

function MyApp({ Component, pageProps }: any) {
  const store = useStore();
  return (
    <>
        <Script
          async={true}
          // src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9733560809553550"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
          crossOrigin="anonymous"
          data-ad-client="ca-pub-9733560809553550"
          onError={(e) => {
            console.error("Script failed to load", e);
          }}
        />
      <ChakraProvider theme={theme} resetCSS={true}>
        <StoreProvider store={store}>
          {Component?.authPage ? (
            <Component {...pageProps} />
          ) : (
            <PlayerLayout>
              <Component {...pageProps} />
            </PlayerLayout>
          )}
        </StoreProvider>
      </ChakraProvider>
    </>
  );
}

export default wrapper.withRedux(MyApp);
