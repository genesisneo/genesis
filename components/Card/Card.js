import Link from 'next/link';
import { connect } from 'react-redux';
import styles from './Card.module.scss';

const Card = ({
  slug,
  thumbnail,
  title,
  year,
  global: {
    versionHash,
    imagePlaceholder,
  },
}) => {
  const onClickHandle = (pageTitle, pageUrl) => {
    if (
      typeof window !== 'undefined'
      && typeof window.gtag !== 'undefined'
    ) {
      const { gtag } = window;
      gtag('event', 'navigate', {
        event_category: 'project',
        event_label: pageTitle.toLowerCase(),
        value: pageUrl,
      });
    }
  };

  return (
    <div className={styles.Card}>
      <Link href="/project/[slug]" as={`/project/${slug}`}>
        <a
          className={styles['Card-link']}
          onClick={() => onClickHandle(title, `/project/${slug}`)}
        >
          <img
            className={`${styles['Card-image']} lazyload`}
            loading="lazy"
            alt={title}
            title={title}
            src={imagePlaceholder}
            data-src={`${thumbnail}?v=${versionHash}`}
          />
          <p className={styles['Card-title']}>
            {title}
            <b className={styles['Card-year']}>
              {year}
            </b>
          </p>
        </a>
      </Link>
    </div>
  );
};

const mapStateToProps = ({ global }) => ({ global });

export default connect(mapStateToProps)(Card);
