import { connect } from 'react-redux';
import { wrapper } from '../redux/store';
import { getPortfolio } from '../redux/actions';
import Invalid from '../components/Invalid/Invalid';
import Cards from '../components/Cards/Cards';

const Index = ({
  portfolio,
  portfolio: {
    error = null,
  },
}) => (
  portfolio.length
    ? <Cards portfolio={portfolio} />
    : error
      ? <Invalid error={error} />
      : null
);

export const getServerSideProps = wrapper.getServerSideProps(
  // eslint-disable-next-line no-return-await
  (store) => async ({ req }) => {
    await store.dispatch(getPortfolio(req.headers.host));
  },
);

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Index);
