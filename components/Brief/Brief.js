import Link from 'next/link';
import { useEffect } from 'react';
import Gallery from '../Gallery/Gallery';
import styles from './Brief.module.scss';

const Brief = ({
  title,
  technology,
  description,
  year,
  images,
  tags,
}) => {
  useEffect(() => {
    if (
      typeof window !== 'undefined'
      && typeof window.gtag !== 'undefined'
    ) {
      // analytics
      const { gtag } = window;
      gtag('config', 'UA-142241147-1', {
        page_title: title.toLowerCase(),
        page_location: window.location.href,
        page_path: window.location.pathname,
      });
      // add particles
      const script = document.createElement('script');
      script.id = 'particles';
      script.src = '/js/particles.min.js';
      script.async = true;
      document.body.appendChild(script);
    }
    return (() => {
      if (
        typeof window !== 'undefined'
        && typeof window.gtag !== 'undefined'
      ) {
        // remove particles
        const script = document.getElementById('particles');
        script.parentNode.removeChild(script);
      }
    });
  }, []);

  const renderChips = (arrayProps) => {
    const dynamicPath = arrayProps === technology
      ? 'technology'
      : 'tag';
    return (
      arrayProps.map((item, index) => {
        const key = `${item}-${index}`;
        return (
          <Link
            key={key}
            href={`/${dynamicPath}/[key]`}
            as={`/${dynamicPath}/${item}`}
          >
            <a className={`${styles['Brief-chips']} ${title}`}>
              {item}
            </a>
          </Link>
        );
      })
    );
  };

  return (
    <div className={styles.Brief}>
      <div className={styles['Brief-particleNetwork']}>
        <div
          id="particle-network"
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      </div>
      <p className={styles['Brief-title']}>
        <b className={styles['Brief-year']}>{year}</b>
        <span className={styles['Brief-name']}>{title}</span>
      </p>
      <div className={styles['Brief-container']}>
        <Gallery
          title={title}
          gallery={images}
        />
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
      </div>
    </div>
  );
};

export default Brief;
