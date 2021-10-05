import Image from 'next/image';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import Head from 'next/head';
import styles from './Details.module.scss';

const Details = ({
  content: {
    name,
    description,
    avatar,
    onlinePresence,
  },
  global: {
    siteName,
    siteDomain,
    versionHash,
    imagePlaceholder,
  },
}) => {
  useEffect(() => {
    // analytics
    if (typeof window.gtag !== 'undefined') {
      const { gtag } = window;
      gtag('config', 'UA-142241147-1', {
        page_title: 'profile',
        page_location: window.location.href,
        page_path: window.location.pathname,
      });
    }
  }, []);

  return (
    <>
      <Head>

        <title>{`Profile - ${siteName}`}</title>

        {/* Meta */}
        <meta
          name="description"
          content="Genesis is a Project Designer and Developer based in Dubai, United Arab Emirates."
        />

        {/* Facebook */}
        <meta
          property="og:description"
          content="Genesis is a Project Designer and Developer based in Dubai, United Arab Emirates."
        />
        <meta property="og:url" content={`${siteDomain}/profile`} />

        {/* Twitter */}
        <meta
          name="twitter:description"
          content="Genesis is a Project Designer and Developer based in Dubai, United Arab Emirates."
        />

      </Head>
      <div className={styles.Details}>

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

        <div className={styles['Details-information']}>
          <b className={styles['Details-headings']}>Biography</b>
          <span className={styles['Details-body']}>
            Genesis is a Project Designer and Developer based in Dubai, United Arab Emirates.
            An innovative, task-driven professional with 8+ years of experience in web design
            and development across diverse industries. Suit with a record of success in
            consistently identifying and providing the technological needs of companies through
            ingenious innovation.
          </span>
          <span className={styles['Details-body']}>
            He has been part of a team that develops some of the known e-commerce sites in
            the Gulf Region, such as Ounass, Gap, Mamas &amp; Papas, Bloomingdales, Spinneys,
            Choithrams, Seddiqi &amp; Sons, and Waitrose, to name a few. Responsible for improving
            and maintaining the front-end codebase, ensuring that the project is scalable,
            collaborating with back-end developers and web designers to improve the usability and
            appropriate technologies to implement new features.
          </span>
          <span className={styles['Details-body']}>
            Genesis also has strong computer science fundamentals, data structures, and
            algorithms. Proficient understanding of cross-browser compatibility, search engine
            optimization, and unit, integration, and functional testing. He is also keen to
            learn and improve his skills and not afraid to jump into new things, creative,
            outside-the-box thinker, and has an eye for detail.
          </span>
        </div>

        <div className={styles['Details-experience']}>
          <b className={styles['Details-headings']}>Experience</b>
          <div className={styles['Details-experience-table']}>

            {/* digital and code */}
            <div className={styles['Details-experience-row']}>
              <div className={styles['Details-experience-col']}>
                <p className={styles['Details-experience-position']}>Front-End Engineer</p>
                <p className={styles['Details-experience-company']}>Digital &amp; Code DMCC</p>
                <p className={styles['Details-experience-location']}>Dubai, United Arab Emirates</p>
                <p className={styles['Details-experience-date']}>Jul 2020 - Sep 2021</p>
                <p className={styles['Details-experience-responsibilities']}>
                  Responsible for converting a design into a full working code, maintaining,
                  optimize, and improve client&apos;s websites such as Spinneys, Choithrams,
                  Waitrose, Ahmed Seddiqi &amp; Sons, Edgar, Core Fit, Kmmrce, Wlth, and
                  Byouty. In charge of prioritizing features and improvements, reviewing
                  pull or merge requests, and working directly with clients, the design
                  team, and back-end engineers to discuss new features and enhancements.
                </p>
              </div>
              <div className={`${styles['Details-experience-col']} ${styles['Details-experience-col-avatar']}`}>
                <div className={styles['Details-experience-companyAvatar']}>
                  <Image
                    className={styles['Details-experience-companyAvatar-image']}
                    alt="Digital &amp; Code"
                    src="/images/experience/digitalandcode.jpg"
                    blurDataURL={imagePlaceholder}
                    layout="fill"
                    placeholder="blur"
                  />
                </div>
              </div>
            </div>

            {/* al tayer */}
            <div className={styles['Details-experience-row']}>
              <div className={styles['Details-experience-col']}>
                <p className={styles['Details-experience-position']}>Front-End Engineer</p>
                <p className={styles['Details-experience-company']}>Al Tayer Insignia</p>
                <p className={styles['Details-experience-location']}>Dubai, United Arab Emirates</p>
                <p className={styles['Details-experience-date']}>Oct 2017 - Jun 2020</p>
                <p className={styles['Details-experience-responsibilities']}>
                  Ensure the technical feasibility of user interface and user experience
                  designs for GAP, Mamas &amp; Papas, Ounass, and Nisnass. Maintain and
                  improve the website, optimize application maximum performance and
                  scalability, collaborate with back-end developers for the features and
                  its functionalities. Also responsible for troubleshooting and fixing
                  any front-end issues and tests the site for multi-device and
                  cross-browser capability. Working closely and collaborating with the
                  design team for design implementation and optimization.
                </p>
              </div>
              <div className={`${styles['Details-experience-col']} ${styles['Details-experience-col-avatar']}`}>
                <div className={styles['Details-experience-companyAvatar']}>
                  <Image
                    className={styles['Details-experience-companyAvatar-image']}
                    alt="Al Tayer Insignia"
                    src="/images/experience/altayer.jpg"
                    blurDataURL={imagePlaceholder}
                    layout="fill"
                    placeholder="blur"
                  />
                </div>
              </div>
            </div>

            {/* first screen */}
            <div className={styles['Details-experience-row']}>
              <div className={styles['Details-experience-col']}>
                <p className={styles['Details-experience-position']}>Product Designer and Developer</p>
                <p className={styles['Details-experience-company']}>First Screen FZ LLC</p>
                <p className={styles['Details-experience-location']}>Dubai, United Arab Emirates</p>
                <p className={styles['Details-experience-date']}>Jun 2013 - Sep 2017</p>
                <p className={styles['Details-experience-responsibilities']}>
                  Responsible for creating &amp; developing effective landing pages for
                  desktop &amp; mobile. Create graphic and media materials using Adobe
                  applications such as Photoshop, Illustrator &amp; Flash. Also
                  responsible for front-end part of the project such as actionscripting,
                  extensible markup language, cascading style sheets, javascript and
                  jquery scripting. Mapping or outlining a website’s structural content,
                  creating or editing images and graphics for web use.
                </p>
              </div>
              <div className={`${styles['Details-experience-col']} ${styles['Details-experience-col-avatar']}`}>
                <div className={styles['Details-experience-companyAvatar']}>
                  <Image
                    className={styles['Details-experience-companyAvatar-image']}
                    alt="First Screen FZ LLC"
                    src="/images/experience/firstscreen.jpg"
                    blurDataURL={imagePlaceholder}
                    layout="fill"
                    placeholder="blur"
                  />
                </div>
              </div>
            </div>

            {/* first mobile wallet */}
            <div className={styles['Details-experience-row']}>
              <div className={styles['Details-experience-col']}>
                <p className={styles['Details-experience-position']}>Web and Graphic Designer</p>
                <p className={styles['Details-experience-company']}>First Mobile Wallet FZ LLC</p>
                <p className={styles['Details-experience-location']}>Dubai, United Arab Emirates</p>
                <p className={styles['Details-experience-date']}>Oct 2012 - May 2013</p>
                <p className={styles['Details-experience-responsibilities']}>
                  Responsible for developing the layout and overall look of the website
                  and mobile application, create graphic and media materials using
                  Adobe applications such as Photoshop, Illustrator and Lightroom. Also
                  respsonsible to ensure that the website and mobile application&apos;s
                  are responsive and user-friendly.
                </p>
              </div>
              <div className={`${styles['Details-experience-col']} ${styles['Details-experience-col-avatar']}`}>
                <div className={styles['Details-experience-companyAvatar']}>
                  <Image
                    className={styles['Details-experience-companyAvatar-image']}
                    alt="First Mobile Wallet FZ LLC"
                    src="/images/experience/firstmobilewallet.jpg"
                    blurDataURL={imagePlaceholder}
                    layout="fill"
                    placeholder="blur"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className={styles['Details-onlinePresence']}>
          {onlinePresence && onlinePresence.map((item) => (
            <a
              className={styles['Details-onlinePresence-link']}
              key={item.name}
              title={item.name}
              href={item.url}
              target="_blank"
              rel="noreferrer"
            >
              <Image
                alt={item.name}
                src={`/images/icons/icon-${item.name.toLowerCase()}.svg`}
                width={32}
                height={32}
              />
            </a>
          ))}
        </div>

      </div>
    </>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Details);
