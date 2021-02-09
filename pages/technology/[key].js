import React from 'react';
import { connect } from 'react-redux';
import Head from 'next/head';
import { getPortfolioByTechnology } from '../../redux/actions';
import Card from '../../components/Card/Card';
import Invalid from '../../components/Invalid/Invalid';

class Technology extends React.PureComponent {
  static async getInitialProps({
    req,
    store,
    isServer,
    query,
  }) {
    const domain = req ? req.headers.host : window.location.host;
    const { key } = query;
    await store.dispatch(getPortfolioByTechnology(domain, key));
    return { isServer, technology: key };
  }

  render() {
    const {
      global: {
        siteName,
      },
      portfolio,
      portfolio: {
        error,
      },
      technology,
    } = this.props;

    if (!technology || error) {
      return (
        <Invalid error={error} />
      );
    }

    return (
      <>
        <Head>
          <title>
            {`Technology: ${technology.charAt(0).toUpperCase() + technology.slice(1)} - ${siteName}`}
          </title>
        </Head>
        <p className="Technology-title">
          <b className="Technology-year">TECHNOLOGY</b>
          <span className="Technology-name">{technology}</span>
        </p>
        {portfolio.map(({
          id,
          thumbnail,
          title,
          slug,
          year,
        }) => (
          <Card
            key={id}
            thumbnail={thumbnail}
            title={title}
            slug={slug}
            year={year}
          />
        ))}
      </>
    );
  }
}

const mapStateToProps = ({ global, portfolio }) => ({ global, portfolio });

export default connect(mapStateToProps)(Technology);
