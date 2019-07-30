import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Loading from '../loading/Loading';
import NotFound from '../notfound/NotFound';
import { getProfile } from '../../redux/actions';
import './About.scss';

class About extends React.Component {
  componentWillMount() {
    document.addEventListener('keydown', this.escapeFunction);
  }

  componentDidMount() {
    // eslint-disable-next-line no-shadow
    const { getProfile } = this.props;
    getProfile();
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.escapeFunction);
  }

  escapeFunction = (event) => {
    if (event.keyCode === 27) {
      document.querySelector('.About__close').click();
    }
  }

  render() {
    const {
      genesis: {
        profile,
        profile: {
          content
        }
      }
    } = this.props;

    if (!Object.keys(profile).length) {
      return <Loading />;
    }

    if (profile.error) {
      return <NotFound />;
    }

    return (
      <div className="About">
        <Helmet>
          <title>Profile - Genesis Mallorca Obtera</title>
        </Helmet>

        <Link className="About__close" to="/" />
        <div className="About__container">
          <h6 className="About__title">
            Profile
          </h6>
          <div
            className="About__content"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: content.join('') }}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ genesis }) => ({ genesis });

export default connect(mapStateToProps, { getProfile })(About);
