import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import Theme from "../config/chakraTheme";
import PlayerLayout from "../components/container/PlayerLayout";
import { StoreProvider } from "easy-peasy";
import { useStore } from "react-redux";
import { wrapper } from "../helper/store";
import "../styles/globals.css";
import ErrorBoundary from "../components/container/ErrorBoundary";
const theme = extendTheme({ ...Theme });

function MyApp({ Component, pageProps }: any) {
  const store = useStore();

  return (
    <ErrorBoundary>
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
    </ErrorBoundary>
  );
}

export default wrapper.withRedux(MyApp);
