import Error from 'next/error';
import Invalid from '../components/Invalid/Invalid';

class MyError extends Error {
  static async getInitialProps({ res, err }) {
    let statusCode;

    if (res) {
      statusCode = res.statusCode;
    } else if (err) {
      statusCode = err.statusCode;
    } else {
      statusCode = 404;
    }

    return { statusCode };
  }

  render() {
    const { statusCode } = this.props;

    return (
      <Invalid code={statusCode} />
    );
  }
}

export default MyError;
