import Link from 'next/link';
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
      <Link href="/">
        <a
          className={styles['AppBar-brand']}
          aria-label="Genesis"
          title="Genesis"
          onClick={() => onClickHandle('home', '/')}
        >
          <img
            className={`${styles['AppBar-logo']} lazyload`}
            loading="lazy"
            alt="Genesis"
            src={imagePlaceholder}
            data-src={`/images/icons/icon-genesis.svg?v=${versionHash}`}
          />
        </a>
      </Link>
      <div className={styles['Appbar-navigation']}>
        <Link href="/">
          <a
            className={styles['AppBar-link']}
            aria-label="Portfolio"
            title="Portfolio"
            onClick={() => onClickHandle('portfolio', '/')}
          >
            <img
              className={`${styles['AppBar-icon']} lazyload`}
              loading="lazy"
              alt="Portfolio"
              src={imagePlaceholder}
              data-src={`/images/icons/icon-portfolio.svg?v=${versionHash}`}
            />
          </a>
        </Link>
        <Link href="/about">
          <a
            className={styles['AppBar-link']}
            aria-label="About"
            title="About"
            onClick={() => onClickHandle('about', '/about')}
          >
            <img
              className={`${styles['AppBar-icon']} lazyload`}
              loading="lazy"
              alt="About"
              src={imagePlaceholder}
              data-src={`/images/icons/icon-about.svg?v=${versionHash}`}
            />
          </a>
        </Link>
      </div>
    </header>
  );
};

const mapStateToProps = ({ global }) => ({ global });

export default connect(mapStateToProps)(AppBar);
