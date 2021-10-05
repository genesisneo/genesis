import Invalid from '../components/Invalid/Invalid';

const MyError = ({ statusCode }) => (
  <Invalid code={statusCode} />
);

MyError.getInitialProps = ({ res, err }) => {
  const statusCode = res
    ? res.statusCode
    : err
      ? err.statusCode
      : 404;
  return { statusCode };
};

export default MyError;
