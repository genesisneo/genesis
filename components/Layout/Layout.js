import React from 'react';
import { connect } from 'react-redux';
import Head from 'next/head';
import AppBar from '../AppBar/AppBar';
import Footer from '../Footer/Footer';
import Schema from '../Schema/Schema';
import styles from './Layout.module.scss';

class Layout extends React.PureComponent {
  componentDidMount() {
    // lazysizes
    (() => window.lazysizes)();
  }

  render() {
    const {
      global: {
        siteName,
        siteDescription,
        siteDomain,
      },
      children,
    } = this.props;

    return (
      <>
        <Head>

          <title>{siteName}</title>

          {/* Meta */}
          <meta name="description" content={siteDescription} />
          <meta name="application-name" content={siteName} />

          {/* Facebook */}
          <meta property="og:locale" content="en_US" />
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content={siteName} />
          <meta property="og:title" content={siteName} />
          <meta property="og:description" content={siteDescription} />
          <meta property="og:url" content={siteDomain} />
          <meta property="og:image" content="/images/genesis.jpg" />
          <meta property="og:image:secure_url" content="/images/genesis.jpg" />

          {/* Twitter */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@genesis_neo" />
          <meta name="twitter:title" content={siteName} />
          <meta name="twitter:description" content={siteDescription} />
          <meta name="twitter:image" content="/images/genesis.jpg" />

        </Head>
        <AppBar />
        <main className={styles.Layout}>
          {children}
        </main>
        <Footer />
        <Schema />
      </>
    );
  }
}

const mapStateToProps = ({ global }) => ({ global });

export default connect(mapStateToProps)(Layout);
