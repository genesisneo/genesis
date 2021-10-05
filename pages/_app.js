import Head from 'next/head';
import { wrapper } from '../redux/store';
import Layout from '../components/Layout/Layout';
import './styles.scss';

const MyApp = ({ Component, pageProps }) => (
  <>
    <Head>

      {/* Meta */}
      <meta charSet="utf-8" />
      <meta name="viewport" content="user-scalable=yes, width=device-width, initial-scale=1" />

      {/* Font */}
      <link
        rel="stylesheet"
        href={decodeURI('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap')}
      />

      {/* Lazysizes */}
      <script
        type="application/javascript"
        dangerouslySetInnerHTML={{
          __html:
          `
            window.lazySizesConfig = window.lazySizesConfig || {};
            window.lazySizesConfig.loadMode = 1;
          `.replace(/(\r\n|\n|\r)|(\s+)/gm, ''),
        }}
      />

    </Head>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </>
);

export default wrapper.withRedux(MyApp);
