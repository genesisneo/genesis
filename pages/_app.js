import { useEffect } from 'react';
import Head from 'next/head';
import { wrapper } from '../redux/store';
import Layout from '../components/Layout/Layout';
import './styles.scss';

const MyApp = ({ Component, pageProps }) => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (() => window.lazysizes)();
    }
  }, []);

  return (
    <>
      <Head>

        {/* Lazysizes */}
        <script
          type="application/javascript"
          dangerouslySetInnerHTML={{
            __html:
            `
              if (typeof window !== 'undefined') {
                window.lazySizesConfig = window.lazySizesConfig || {};
                window.lazySizesConfig.expand = 0;
                window.lazySizesConfig.loadMode = 1;
              }
            `.replace(/(\t\r\n|\n|\r|\t)/, ''),
          }}
        />

      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
};

export default wrapper.withRedux(MyApp);
