import { connect } from 'react-redux';
import { wrapper } from '../redux/store';
import { getProfile } from '../redux/actions';
import Invalid from '../components/Invalid/Invalid';
import Details from '../components/Details/Details';

const Profile = ({
  profile: {
    error = null,
    content,
  },
}) => (
  content
    ? <Details content={content} />
    : error
      ? <Invalid error={error} />
      : null
);

export const getServerSideProps = wrapper.getServerSideProps(
  // eslint-disable-next-line no-return-await
  (store) => async ({ req }) => {
    await store.dispatch(getProfile(req.headers.host));
  },
);

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Profile);
