import { useEffect } from 'react';
import Gallery from '../Gallery/Gallery';
import Card from '../Card/Card';
import styles from './Brief.module.scss';

const Brief = ({
  title,
  technology,
  description,
  year,
  images,
  tags,
  featured,
}) => {
  useEffect(() => {
    // analytics
    if (typeof window.gtag !== 'undefined') {
      const { gtag } = window;
      gtag('config', 'UA-142241147-1', {
        page_title: title.toLowerCase(),
        page_location: window.location.href,
        page_path: window.location.pathname,
      });
    }
  }, []);

  const renderChips = (arrayProps) => {
    const dynamicPath = arrayProps === technology
      ? 'technology'
      : 'tag';

    return (
      arrayProps.map((item, index) => {
        const key = `${item}-${index}`;
        return (
          <a
            key={key}
            className={`${styles['Brief-chips']} ${title}`}
            href={`/${dynamicPath}/${item}`}
          >
            {item}
          </a>
        );
      })
    );
  };

  return (
    <div className={styles.Brief}>

      <p className={styles['Brief-title']}>
        <b className={styles['Brief-year']}>{year}</b>
        <span className={styles['Brief-name']}>{title}</span>
      </p>

      <div className={styles['Brief-gallery']}>
        <Gallery
          title={title}
          gallery={images}
        />
      </div>

      <div className={styles['Brief-information']}>
        <p className={styles['Brief-items']}>
          <b className={styles['Brief-headings']}>Description</b>
          <span className={styles['Brief-body']}>{description}</span>
        </p>
        <p className={styles['Brief-items']}>
          <b className={styles['Brief-headings']}>Technology</b>
          {renderChips(technology)}
        </p>
        <p className={styles['Brief-items']}>
          <b className={styles['Brief-headings']}>Tags</b>
          {renderChips(tags)}
        </p>
      </div>

      <div className={styles['Brief-otherProjects']}>
        <b className={styles['Brief-otherProjects-title']}>Other Projects</b>
        <div className={styles['Brief-otherProjects-cards']}>
          {featured.map((item) => (
            <Card
              key={item.id}
              thumbnail={item.thumbnail}
              title={item.title}
              slug={item.slug}
              year={item.year}
            />
          ))}
        </div>
      </div>

    </div>
  );
};

export default Brief;
