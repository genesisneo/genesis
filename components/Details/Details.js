import { useEffect } from 'react';
import { connect } from 'react-redux';
import styles from './Details.module.scss';

const Details = ({
  content: {
    name,
    description,
    avatar,
    onlinePresence,
  },
  global: {
    versionHash,
    imagePlaceholder,
  },
}) => {
  useEffect(() => {
    if (
      typeof window !== 'undefined'
      && typeof window.gtag !== 'undefined'
    ) {
      // analytics
      const { gtag } = window;
      gtag('config', 'UA-142241147-1', {
        page_title: 'about',
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
  });

  return (
    <div className={styles.Details}>
      <div className={styles['Details-particleNetwork']}>
        <div
          id="particle-network"
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      </div>
      <p className={styles['Details-title']}>
        <b className={styles['Details-description']}>{description}</b>
        <span className={styles['Details-name']}>{name}</span>
      </p>
      <img
        className={`${styles['Details-avatar']} lazyload`}
        loading="lazy"
        alt={name}
        title={name}
        src={imagePlaceholder}
        data-src={`${avatar}?v=${versionHash}`}
      />
      <div className={styles['Details-container']}>
        <div className={styles['Details-information']}>
          <p className={styles['Details-items']}>
            <b className={styles['Details-headings']}>About me</b>
            <span className={styles['Details-body']}>
              I started as a web designer in the Philippines way back 2004 and
              now a front-end developer based in Dubai, United Arab Emirates.
            </span>
            <span className={styles['Details-body']}>
              Started by examining every websites source code until I get to know
              every code&apos;s purpose and function. Through online tutorials and
              a whole deal of self-study, I was able to broaden my portfolio of
              expertise and now versatile in various web technologies.
            </span>
            <span className={styles['Details-body']}>
              My passion is for technology. Technology is changing very rapidly.
              If you don&apos;t keep up, the risk of becoming obsolete is very high.
            </span>
          </p>
          <p className={styles['Details-items']}>
            <b className={styles['Details-headings']}>Technical SKills</b>
            <span className={styles['Details-body']}>
              Web technologies like HTMl, CSS, JavaScript, WordPress, PHP, MySQL, jQuery,
              Git, NodeJS, EpressJS, ReactJS, ElectronJS, WebPack, Gulp, and Grunt.
            </span>
            <span className={styles['Details-body']}>
              Adobe Creative Cloud products such as Acrobat, After Effects, Audition,
              Dreamweaver, Flash, Illustrator, Media Encoder, Photoshop, Premiere, and Soundbooth.
            </span>
            <span className={styles['Details-body']}>
              Microsoft Office Access, Excel, OneDrive, OneNote, Outlook, Power Bi,
              Powerpoint, SharePoint, Sway, Word, Visual Studio and Studio Code.
            </span>
            <span className={styles['Details-body']}>
              Basic modeling, rendering, and animation using
              Google Sketchup and Autodesk 3D Studio Max.
            </span>
            <span className={styles['Details-body']}>
              Knowledgeable in a computer, tablet, and mobile phone
              troubleshooting, optimization, and maintenance.
            </span>
          </p>
          <p className={styles['Details-items']}>
            <b className={styles['Details-headings']}>Hobbies</b>
            <span className={styles['Details-body']}>
              Drawing, photography, basketball, games, and travel.
            </span>
            <span className={styles['Details-body']}>
              You can&lsquo;t spend all day on a computer so it&lsquo;s better to have
              something to balance it. I think especially visual crafts are handy for a
              front-end developer as they force you to see the world differently.
            </span>
          </p>
        </div>
        <div className={styles['Details-socialNetwork']}>
          <p className={styles['Details-items']}>
            <b className={styles['Details-headings']}>Online Presence</b>
            {onlinePresence.map(({ name: network, url }, index) => {
              const key = `${network}-${index}`;
              return (
                <a
                  key={key}
                  className={styles['Details-socialLink']}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  aria-label={network}
                  title={network}
                >
                  <img
                    className={`${styles['Details-socialIcon']} lazyload`}
                    loading="lazy"
                    alt={network}
                    title={network}
                    src={imagePlaceholder}
                    data-src={`/images/icons/icon-${network.toLowerCase()}.svg?v=${versionHash}`}
                  />
                  {network}
                </a>
              );
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ global }) => ({ global });

export default connect(mapStateToProps)(Details);
