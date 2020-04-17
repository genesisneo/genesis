import React from 'react';
import { connect } from 'react-redux';
import styles from './Footer.module.scss';

class Footer extends React.PureComponent {
  render() {
    const {
      global: {
        siteName,
      },
    } = this.props;

    return (
      <footer className={styles.Footer}>
        <p className={styles['Footer-copyright']}>
          {`Copyright © ${new Date().getFullYear()} ${siteName}. All rights reserved.`}
        </p>
      </footer>
    );
  }
}

const mapStateToProps = ({ global }) => ({ global });

export default connect(mapStateToProps)(Footer);
