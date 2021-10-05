import Invalid from '../components/Invalid/Invalid';

const internalServerError = () => (
  <Invalid code={500} />
);

export default internalServerError;
