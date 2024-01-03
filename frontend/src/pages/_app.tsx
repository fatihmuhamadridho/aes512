import "../styles/globals.css";
import "@mantine/core/styles.css";
import "@mantine/dropzone/styles.css";
import "@mantine/nprogress/styles.css";
import "@mantine/dates/styles.css";

import type { AppProps } from "next/app";
import Head from "next/head";
import { QueryClient, QueryClientProvider } from "react-query";
import { MantineProvider, createTheme } from "@mantine/core";
import { RouterTransition } from "@/components/atoms/RouterTransition/RouterTransition";
import { AuthProvider } from "@/components/atoms/Auth/AuthProvider";

export default function App({ Component, pageProps }: AppProps) {
  const theme = createTheme({});
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        cacheTime: 5 * 6 * 1000,
      },
    },
  });

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </Head>
      <QueryClientProvider client={queryClient}>
        <MantineProvider theme={theme}>
          <AuthProvider>
            <RouterTransition />
            <Component {...pageProps} />
          </AuthProvider>
        </MantineProvider>
      </QueryClientProvider>
    </>
  );
}
