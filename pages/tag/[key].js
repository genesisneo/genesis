import React from 'react';
import { connect } from 'react-redux';
import Head from 'next/head';
import { getPortfolioByTags } from '../../redux/actions';
import Card from '../../components/Card/Card';
import Invalid from '../../components/Invalid/Invalid';

class Tag extends React.PureComponent {
  static getInitialProps = async ({
    req,
    store,
    isServer,
    query,
  }) => {
    const domain = req ? req.headers.host : window.location.host;
    const { key } = query;
    await store.dispatch(getPortfolioByTags(domain, key));
    return { isServer, tag: key };
  };

  render() {
    const {
      global: {
        siteName,
      },
      portfolio,
      portfolio: {
        error,
      },
      tag,
    } = this.props;

    if (!tag || error) {
      return (
        <Invalid error={error} />
      );
    }

    return (
      <>
        <Head>
          <title>
            {`Tag: ${tag.charAt(0).toUpperCase() + tag.slice(1)} - ${siteName}`}
          </title>
        </Head>
        <p className="Tag-title">
          <b className="Tag-year">TAG</b>
          <span className="Tag-name">{tag}</span>
        </p>
        {portfolio.map(({
          id,
          thumbnail,
          title,
          year,
        }) => (
          <Card
            key={id}
            id={id}
            thumbnail={thumbnail}
            title={title}
            year={year}
          />
        ))}
      </>
    );
  }
}

const mapStateToProps = ({ global, portfolio }) => ({ global, portfolio });

export default connect(mapStateToProps)(Tag);
