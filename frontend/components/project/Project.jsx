import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import uuid from 'uuid/v4';
import Loading from '../loading/Loading';
import NotFound from '../notfound/NotFound';
import { getProject } from '../../redux/actions';
import './Project.scss';

class Project extends React.Component {
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

    // eslint-disable-next-line no-shadow
    const { getProject } = this.props;
    getProject(id);
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
      genesis: {
        project,
        project: {
          id,
          title,
          technology,
          description,
          year,
          images,
          tags,
        }
      }
    } = this.props;

    if (!Object.keys(project).length) {
      return <Loading />;
    }

    if (project.error) {
      return <NotFound />;
    }

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

const mapStateToProps = ({ genesis }) => ({ genesis });

export default connect(mapStateToProps, { getProject })(Project);
