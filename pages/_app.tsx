import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { StyledEngineProvider } from '@mui/material/styles';
import { ApolloProvider } from "@apollo/client";
import client from "configs/pokemon-gql/apollo-client";
import { ContextProvider } from "configs/ReferenceDataContext";
import Div from 'component/Segment';
import Head from 'next/head';
import dynamic from 'next/dynamic';
const HeaderBar = dynamic(() => import('component/Header'))
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Div>
      <Head>
        <title>Pokemon</title>
        <meta name="description" content="Pokemon Listing" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <StyledEngineProvider injectFirst>
        <ApolloProvider client={client.clientOtherRender}>
          <ContextProvider>
            <HeaderBar counter={0} />
            <Component {...pageProps} />
          </ContextProvider>
        </ApolloProvider>
      </StyledEngineProvider>
    </Div>

  )
}

export default MyApp
