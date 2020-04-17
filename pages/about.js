import React from 'react';
import { connect } from 'react-redux';
import { getProfile } from '../redux/actions';
import Details from '../components/Details/Details';
import Invalid from '../components/Invalid/Invalid';

class About extends React.PureComponent {
  static getInitialProps = async ({
    req,
    store,
    isServer,
  }) => {
    const domain = req ? req.headers.host : window.location.host;
    await store.dispatch(getProfile(domain));
    return { isServer };
  };

  render() {
    const {
      profile: {
        error,
        content,
      },
    } = this.props;

    if (error) {
      return (
        <Invalid error={error} />
      );
    }

    return (
      <>
        <Details content={content} />
      </>
    );
  }
}

const mapStateToProps = ({ profile }) => ({ profile });

export default connect(mapStateToProps)(About);
