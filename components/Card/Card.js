import Image from 'next/image';
import { connect } from 'react-redux';
import styles from './Card.module.scss';

const Card = ({
  slug,
  thumbnail,
  title,
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
      <a
        className={styles['Card-link']}
        onClick={() => onClickHandle(title, `/project/${slug}`)}
        href={`/project/${slug}`}
      >
        <Image
          className={styles['Card-image']}
          alt={title}
          src={`${thumbnail}?v=${versionHash}`}
          blurDataURL={imagePlaceholder}
          layout="fill"
          placeholder="blur"
        />
      </a>
    </div>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Card);
