import { connect } from 'react-redux';
import styles from './AppBar.module.scss';

const AppBar = ({
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
      gtag('event', 'navigation', {
        event_category: 'page',
        event_label: pageTitle,
        value: pageUrl,
      });
    }
  };

  return (
    <header className={styles.AppBar}>
      <a
        className={styles['AppBar-brand']}
        aria-label="Genesis"
        title="Genesis"
        onClick={() => onClickHandle('home', '/')}
        href="/"
      >
        <img
          className={`${styles['AppBar-logo']} lazyload`}
          loading="lazy"
          alt="Genesis"
          src={imagePlaceholder}
          data-src={`/images/icons/icon-genesis.svg?v=${versionHash}`}
        />
      </a>
      <div>
        <a
          className={styles['AppBar-link']}
          aria-label="Profile"
          title="Profile"
          onClick={() => onClickHandle('profile', '/profile')}
          href="/profile"
        >
          Profile
        </a>
      </div>
    </header>
  );
};

const mapStateToProps = ({ global }) => ({ global });

export default connect(mapStateToProps)(AppBar);
