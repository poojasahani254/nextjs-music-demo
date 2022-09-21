import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import Theme from "../config/chakraTheme";
import { StoreProvider } from "easy-peasy";
import { useStore } from "react-redux";
import { wrapper } from "../helper/store";
import "../styles/globals.css";
const theme = extendTheme({ ...Theme });
import { Suspense } from "react";
import dynamic from "next/dynamic";

const PlayerLayout = dynamic(
  () => import("../components/container/PlayerLayout"),
  {
    suspense: true,
  }
);

const ErrorBoundary = dynamic(
  () => import("../components/container/ErrorBoundary"),
  {
    suspense: true,
  }
);

function MyApp({ Component, pageProps }: any) {
  const store = useStore();

  return (
    <Suspense fallback={`Loading...`}>
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
    </Suspense>
  );
}

export default wrapper.withRedux(MyApp);
