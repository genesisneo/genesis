import Document, { Head, Main, NextScript } from 'next/document';
import getConfig from 'next/config';

const {
  publicRuntimeConfig,
} = getConfig();
const versionHash = publicRuntimeConfig.versionHash.length > 5
  ? publicRuntimeConfig.versionHash.substring(0, 5)
  : publicRuntimeConfig.versionHash;

export default class MyDocument extends Document {
  render() {
    return (
      <html lang="en">
        <Head>

          {/* Icon */}
          <link rel="icon" type="image/png" href={`/favicon.png?v=${versionHash}`} />
          <link rel="icon shortcut" type="image/png" href={`/favicon.png?v=${versionHash}`} />

          {/* Manifest */}
          <link rel="manifest" href={`/manifest.json?v=${versionHash}`} />

          {/* Android & iOS */}
          <meta name="theme-color" content="#333333" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black" />

          {/* Windows */}
          <meta name="msapplication-TileColor" content="#333333" />
          <meta name="msapplication-square70x70logo" content={`/images/app/windows-70x70.png?v=${versionHash}`} />
          <meta name="msapplication-square150x150logo" content={`/images/app/windows-150x150.png?v=${versionHash}`} />
          <meta name="msapplication-wide310x150logo" content={`/images/app/windows-310x150.png?v=${versionHash}`} />
          <meta name="msapplication-square310x310logo" content={`/images/app/windows-310x310.png?v=${versionHash}`} />

        </Head>
        <body>

          <Main />
          <NextScript />

          {/* Google Analytics */}
          <script async src="https://googletagmanager.com/gtag/js?id=UA-142241147-1" />
          <script
            type="application/javascript"
            dangerouslySetInnerHTML={{
              __html:
              `
                window.dataLayer = window.dataLayer || [];
                function gtag() { dataLayer.push(arguments); }
                gtag('js', new Date());
                gtag('config', 'UA-142241147-1');
              `.replace(/(\r\n|\n|\r)/gm, ''),
            }}
          />

          {/* Service Worker */}
          <script
            type="application/javascript"
            dangerouslySetInnerHTML={{
              __html:
              `
                if ('serviceWorker' in navigator && !navigator.serviceWorker.controller) {
                  window.addEventListener('load', async function() {
                    try {
                      const serviceWorkerRegistered = await navigator
                        .serviceWorker
                        .register(
                          '/service-worker.js?version=${versionHash}',
                          {
                            scope: '/',
                            useCache: false
                          }
                        );
                      if (serviceWorkerRegistered) {
                        console.info('ServiceWorker registration successful!');
                      }
                    } catch(error) {
                      console.info('ServiceWorker registration failed!');
                    }
                  });
                }
              `,
            }}
          />

        </body>
      </html>
    );
  }
}
