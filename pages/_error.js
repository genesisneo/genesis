import Error from 'next/error';
import Invalid from '../components/Invalid/Invalid';

class MyError extends Error {
  render() {
    const { statusCode } = this.props;

    return (
      <Invalid code={statusCode} />
    );
  }
}

export default MyError;
