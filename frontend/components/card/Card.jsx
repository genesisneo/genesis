import React from 'react';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import './Card.scss';

class Card extends React.Component {
  onClick = (viewTitle, viewUrl) => {
    const { gtag } = window;
    if (gtag) {
      gtag('event', 'Modal', {
        event_category: 'Project',
        event_label: viewTitle,
        value: viewUrl
      });
    }
  }

  render() {
    const {
      id,
      thumbnail,
      title,
      description,
    } = this.props;

    return (
      <Link
        className="Card"
        to={`/project/${id}`}
        onClick={() => this.onClick(title, `/project/${id}`)}
      >
        <div className="Card__image-container">
          <LazyLoadImage
            className="Card__thumbnail"
            alt={title}
            title={title}
            src={thumbnail}
            loading="lazy"
            effect="blur"
            placeholderSrc={`/resize?w=100&h=50&i=${thumbnail}`}
            delayTime={100}
            threshold={100}
          />
        </div>
        <div className="Card__information">
          <h6 className="Card__title">
            {title}
          </h6>
          <p className="Card__description">
            {`${description.substring(0, 128)}...`}
          </p>
          <p className="Card__link">
            Read more
          </p>
        </div>
      </Link>
    );
  }
}

export default Card;
