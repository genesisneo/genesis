import Document, { Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <html lang="en">
        <Head>

          {/* Android & iOS */}
          <meta name="theme-color" content="#333333" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black" />

          {/* Windows */}
          <meta name="msapplication-TileColor" content="#333333" />
          <meta name="msapplication-square70x70logo" content="/images/app/windows-70x70.png" />
          <meta name="msapplication-square150x150logo" content="/images/app/windows-150x150.png" />
          <meta name="msapplication-wide310x150logo" content="/images/app/windows-310x150.png" />
          <meta name="msapplication-square310x310logo" content="/images/app/windows-310x310.png" />

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

        </body>
      </html>
    );
  }
}