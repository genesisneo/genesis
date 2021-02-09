import React from 'react';
import { connect } from 'react-redux';
import { getPortfolio } from '../redux/actions';
import Card from '../components/Card/Card';
import Invalid from '../components/Invalid/Invalid';

class Index extends React.PureComponent {
  static async getInitialProps({ req, store, isServer }) {
    const domain = req ? req.headers.host : window.location.host;
    await store.dispatch(getPortfolio(domain));
    return { isServer };
  }

  render() {
    const {
      portfolio,
      portfolio: {
        error,
      },
    } = this.props;

    if (error) {
      return (
        <Invalid error={error} />
      );
    }

    return (
      <>
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

const mapStateToProps = ({ portfolio }) => ({ portfolio });

export default connect(mapStateToProps)(Index);
