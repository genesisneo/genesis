import App from 'next/app';
import Head from 'next/head';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import reduxStore from '../redux/store';
import Layout from '../components/Layout/Layout';
import './styles.scss';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return { pageProps };
  }

  render() {
    const {
      Component,
      pageProps,
      store,
    } = this.props;

    return (
      <Provider store={store}>
        <>
          <Head>

            {/* Meta */}
            <meta charSet="utf-8" />
            <meta name="viewport" content="user-scalable=yes, width=device-width, initial-scale=1" />

            {/* Icon */}
            <link rel="icon" type="image/png" href="/favicon.png" />
            <link rel="icon shortcut" type="image/png" href="/favicon.png" />

            {/* Manifest */}
            <link rel="manifest" href="/manifest.json" />

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
      </Provider>
    );
  }
}

export default withRedux(reduxStore)(MyApp);
