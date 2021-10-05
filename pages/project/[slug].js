import Head from 'next/head';
import { connect } from 'react-redux';
import { wrapper } from '../../redux/store';
import { getProject } from '../../redux/actions';
import Invalid from '../../components/Invalid/Invalid';
import Brief from '../../components/Brief/Brief';
import Schema from '../../components/Schema/Schema';

const Project = ({
  global: {
    siteName,
    siteDomain,
  },
  portfolio,
  project,
  project: {
    error = null,
    title,
    slug,
    technology,
    description,
    year,
    images,
    tags,
  },
}) => (
  project && Object.keys(project).length
    ? (
      <>
        <Head>

          <title>{`${title} - ${siteName}`}</title>

          {/* Meta */}
          <meta name="description" content={`${description.substring(0, 157)}...`} />

          {/* Facebook */}
          <meta property="og:title" content={title} />
          <meta property="og:description" content={`${description.substring(0, 157)}...`} />
          <meta property="og:url" content={`${siteDomain}/project/${slug}`} />
          <meta property="og:image" content={images[0]} />
          <meta property="og:image:secure_url" content={images[0]} />

          {/* Twitter */}
          <meta name="twitter:title" content={title} />
          <meta name="twitter:description" content={`${description.substring(0, 157)}...`} />
          <meta name="twitter:image" content={images[0]} />

        </Head>
        <Brief
          title={title}
          technology={technology}
          description={description}
          year={year}
          images={images}
          tags={tags}
          featured={portfolio.slice(-2)}
        />
        <Schema schemaProject={project} />
      </>
    )
    : error
      ? <Invalid error={error} />
      : null
);

export const getServerSideProps = wrapper.getServerSideProps(
  // eslint-disable-next-line no-return-await
  (store) => async ({ req, params: { slug: key } }) => {
    await store.dispatch(getProject(req.headers.host, key));
  },
);

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Project);
