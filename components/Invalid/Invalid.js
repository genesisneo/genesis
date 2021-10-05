import { connect } from 'react-redux';
import styles from './Invalid.module.scss';

const Invalid = ({
  code = 404,
  global: {
    imagePlaceholder,
  },
}) => {
  const errorTitlee = code === 404
    ? 'Page not found'
    : 'Internal server error';
  const errorMessage = code === 404
    ? 'The requested URL was not found on this server.'
    : 'The server encountered a temporary error and could not complete your request.';

  return (
    <div className={styles.Invalid}>
      <p className={styles['Invalid-title']}>
        <b className={styles['Invalid-description']}>{code}</b>
        <span className={styles['Invalid-name']}>{errorTitlee}</span>
      </p>
      <img
        className={`${styles['Invalid-image']} lazyload`}
        loading="lazy"
        alt={errorTitlee}
        src={imagePlaceholder}
        data-src="/images/error.jpg"
      />
      <p className={styles['Invalid-message']}>
        {errorMessage}
      </p>
    </div>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Invalid);
