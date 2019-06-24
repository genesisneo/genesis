import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Loading from '../loading/Loading';
import NotFound from '../notfound/NotFound';
import './About.scss';

class About extends React.Component {
  state = {
    about: {},
  };

  componentDidMount() {
    fetch('/api/genesis')
      .then(res => res.json())
      .then((data) => {
        this.setState({ about: data.about ? data.about : { error: 'Page not found' } });
      });
  }

  render() {
    const {
      about
    } = this.state;

    if (!Object.keys(about).length) {
      return <Loading />;
    }

    if (about.error) {
      return <NotFound />;
    }

    const {
      about: {
        content = [],
      }
    } = this.state;

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
            dangerouslySetInnerHTML={{ __html: content.join('') }}
          />
        </div>
      </div>
    );
  }
}

export default About;
