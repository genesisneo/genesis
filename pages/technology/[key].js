import Head from 'next/head';
import { connect } from 'react-redux';
import { wrapper } from '../../redux/store';
import { getPortfolioByTechnology } from '../../redux/actions';
import Invalid from '../../components/Invalid/Invalid';
import Cards from '../../components/Cards/Cards';

const Technology = ({
  global: {
    siteName,
  },
  portfolio,
  portfolio: {
    error = null,
  },
  technology,
}) => (
  portfolio.length
    ? (
      <>
        <Head>
          <title>
            {`Technology: ${technology.charAt(0).toUpperCase() + technology.slice(1)} - ${siteName}`}
          </title>
        </Head>
        <p className="Technology-title">
          <b className="Technology-year">TECHNOLOGY</b>
          <span className="Technology-name">{technology}</span>
        </p>
        <Cards portfolio={portfolio} />
      </>
    )
    : error
      ? <Invalid error={error} />
      : null
);

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async ({ req, params: { key } }) => {
    await store.dispatch(getPortfolioByTechnology(req.headers.host, key));
    return {
      props: { technology: key },
    };
  },
);

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Technology);
