import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import Theme from "../appConfiguration/chakraTheme";
import PlayerLayout from "../components/container/PlayerLayout";
import { StoreProvider } from "easy-peasy";
import { useStore } from "react-redux";
import { wrapper } from "../lib/store";
import "../styles/globals.css";
const theme = extendTheme({ ...Theme });

function MyApp({ Component, pageProps }: any) {
  const store = useStore();
  return (
    <>
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
