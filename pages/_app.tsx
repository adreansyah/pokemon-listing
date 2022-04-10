import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { StyledEngineProvider } from '@mui/material/styles';
import { ApolloProvider } from "@apollo/client";
import client from "configs/pokemon-gql/apollo-client";
import { ContextProvider } from "configs/ReferenceDataContext";
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { Router, useRouter } from 'next/router';
import Div from 'component/base-component/Segment';
import { CircularProgress } from '@mui/material';
export async function getServerSideProps({ req, res }: {
  req: any,
  res: any
}) {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  )

  return {
    props: {},
  }
}
const HeaderBar = dynamic(() => import('component/base-component/Header'))
type Defaults = {
  title: string
  children: any,
}
const DefaultLayout = ({ children, title }: Defaults) => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    Router.events.on('routeChangeStart', () => setLoading(true));
    Router.events.on('routeChangeComplete', () => setLoading(false));
    Router.events.on('routeChangeError', () => setLoading(false));
    return () => {
      Router.events.off('routeChangeStart', () => setLoading(true));
      Router.events.off('routeChangeComplete', () => setLoading(false));
      Router.events.off('routeChangeError', () => setLoading(false));
    };
  }, []);
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Pokemon Listing" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeaderBar />
      {loading ? <Div className='pre-loader'><CircularProgress color='warning' size={50} /></Div> : children}
    </>
  );
};

const FetchPage = ({ children }: any) => {
  const { pathname } = useRouter()
  const currentPath = pathname.split("/")[1];
  switch (currentPath) {
    case "my-pokemon-detail":
      return (
        <DefaultLayout title="Pokemon Detail">
          {children}
        </DefaultLayout>
      );
      break;
    case "my-pokemon-list":
      return (
        <DefaultLayout title="My Pokemon Collection">
          {children}
        </DefaultLayout>
      );
      break;
    default:
      return (
        <DefaultLayout title="Pokemon Listing">
          {children}
        </DefaultLayout>
      );
      break;
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StyledEngineProvider injectFirst>
      <ApolloProvider client={client.clientOtherRender}>
        <ContextProvider>
          <FetchPage>
            <Component {...pageProps} />
          </FetchPage>
        </ContextProvider>
      </ApolloProvider>
    </StyledEngineProvider>
  )
}

export default MyApp
