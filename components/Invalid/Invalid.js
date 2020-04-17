import { connect } from 'react-redux';
import styles from './Invalid.module.scss';

const Invalid = ({
  code = 404,
  error = 'Page not found',
  global: {
    versionHash,
    imagePlaceholder,
  },
}) => (
  <div className={styles.Invalid}>
    <p className={styles['Invalid-title']}>
      <b className={styles['Invalid-description']}>{code}</b>
      <span className={styles['Invalid-name']}>{error}</span>
    </p>
    <img
      className={`${styles['Invalid-image']} lazyload`}
      loading="lazy"
      alt={error}
      src={imagePlaceholder}
      data-src={`/images/error.jpg?v=${versionHash}`}
    />
    <p className={styles['Invalid-message']}>
      Sorry, we can&apos;t find that page. It might be an old link or maybe it moved.
    </p>
  </div>
);

const mapStateToProps = ({ global }) => ({ global });

export default connect(mapStateToProps)(Invalid);
