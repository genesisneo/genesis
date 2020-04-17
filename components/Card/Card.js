import Link from 'next/link';
import { connect } from 'react-redux';
import styles from './Card.module.scss';

const Card = ({
  id,
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
      <Link href="/project/[id]" as={`/project/${id}`}>
        <a
          className={styles['Card-link']}
          onClick={() => onClickHandle(title, `/project/${id}`)}
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
