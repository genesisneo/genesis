import Head from 'next/head';
import { connect } from 'react-redux';
import { wrapper } from '../../redux/store';
import { getPortfolioByTags } from '../../redux/actions';
import Invalid from '../../components/Invalid/Invalid';
import Cards from '../../components/Cards/Cards';

const Tag = ({
  global: {
    siteName,
  },
  portfolio,
  portfolio: {
    error = null,
  },
  tag,
}) => (
  portfolio.length
    ? (
      <>
        <Head>
          <title>
            {`Tag: ${tag.charAt(0).toUpperCase() + tag.slice(1)} - ${siteName}`}
          </title>
        </Head>
        <p className="Tag-title">
          <b className="Tag-year">TAG</b>
          <span className="Tag-name">{tag}</span>
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
    await store.dispatch(getPortfolioByTags(req.headers.host, key));
    return {
      props: { tag: key },
    };
  },
);

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Tag);
