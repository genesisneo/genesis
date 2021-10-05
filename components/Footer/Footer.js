import React from 'react';
import { connect } from 'react-redux';
import styles from './Footer.module.scss';

const Footer = ({
  global: {
    siteName,
  },
}) => (
  <footer className={styles.Footer}>
    <p className={styles['Footer-copyright']}>
      {`Copyright © ${new Date().getFullYear()} ${siteName}. All rights reserved.`}
    </p>
  </footer>
);

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Footer);
