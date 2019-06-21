import React from 'react';
import { Link } from 'react-router-dom';
import './AppBar.scss';

class AppBar extends React.Component {
  onClick = (viewTitle, viewUrl) => {
    const { gtag } = window;
    if (gtag) {
      gtag('event', 'Modal', {
        event_category: 'About',
        event_label: viewTitle,
        value: viewUrl
      });
    }
  }

  render() {
    return (
      <header className="AppBar">
        <Link
          className="AppBar__link"
          to="/"
          onClick={() => this.onClick('Home', '/')}
        >
          <img
            className="AppBar__image"
            alt="Genesis Mallorca Obtera"
            title="Genesis Mallorca Obtera"
            src="/images/logo.svg"
            loading="eager"
          />
        </Link>
        <Link
          className="AppBar__link"
          to="/about"
          onClick={() => this.onClick('About', '/about')}
        >
          <img
            className="AppBar__image"
            alt="Information"
            title="Information"
            src="/images/info.svg"
            loading="eager"
          />
        </Link>
      </header>
    );
  }
}

export default AppBar;
