import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import uuid from 'uuid/v4';
import Loading from '../loading/Loading';
import NotFound from '../notfound/NotFound';
import './Project.scss';

class Project extends React.Component {
  state = {
    project: {}
  };

  componentWillMount() {
    document.addEventListener('keydown', this.escapeFunction);
  }

  componentDidMount() {
    const {
      match: {
        params: {
          id,
        }
      }
    } = this.props;

    fetch('/api/genesis')
      .then(res => res.json())
      .then((data) => {
        const item = data.portfolio.filter(items => items.id === parseInt(id, 10));
        this.setState({ project: item.length !== 0 ? item[0] : { error: 'Page not found' } });
      });
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.escapeFunction);
  }

  escapeFunction = (event) => {
    if (event.keyCode === 27) {
      document.querySelector('.Project__close').click();
    }
  }

  render() {
    const {
      project
    } = this.state;

    if (!Object.keys(project).length) {
      return <Loading />;
    }

    if (project.error) {
      return <NotFound />;
    }

    const {
      project: {
        id,
        title,
        technology,
        description,
        year,
        images,
        tags,
      }
    } = this.state;

    return (
      <div className="Project">
        <Helmet>
          <title>{`${title} - Genesis Mallorca Obtera`}</title>
        </Helmet>

        <Link className="Project__close" to="/" />
        <div className="Project__container">
          <h6 className={`Project__title ${id}`}>
            {title}
          </h6>
          <p className="Project__descriptions">
            <b className="subtitle">Description</b>
            <span className="Project__description">
              {description}
            </span>
          </p>
          <p className="Project__years">
            <b className="subtitle">Year</b>
            <span className="Project__year">
              {year}
            </span>
          </p>
          <p className="Project__technology">
            <b className="subtitle">Technology</b>
            {
              technology.map(tech => (
                <img
                  key={uuid()}
                  alt={tech.charAt(0).toUpperCase() + tech.slice(1)}
                  title={tech.charAt(0).toUpperCase() + tech.slice(1)}
                  src={`/images/technology/icon-${tech}.svg`}
                  loading="lazy"
                />
              ))
            }
          </p>
          <p className="Project__tags">
            <b className="subtitle">Tags</b>
            {
              tags.map((tag, key, arr) => (
                <span
                  key={uuid()}
                  className="Project__tag"
                >
                  {tag}
                  {arr.length !== key + 1 ? ', ' : '' }
                </span>
              ))
            }
          </p>
          {
            images.map((image, key) => (
              <div
                key={uuid()}
                className="Project__image-container"
              >
                <LazyLoadImage
                  className="Project__image"
                  alt={`${title} ${key + 1}`}
                  title={`${title} ${key + 1}`}
                  src={image}
                  loading="lazy"
                  effect="blur"
                  placeholderSrc={`/resize?w=100&h=50&i=${image}`}
                  delayTime={100}
                  threshold={100}
                />
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

export default Project;
