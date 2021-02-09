import React from 'react';
import { connect } from 'react-redux';
import Head from 'next/head';
import { getProject } from '../../redux/actions';
import Brief from '../../components/Brief/Brief';
import Invalid from '../../components/Invalid/Invalid';
import Schema from '../../components/Schema/Schema';

class Project extends React.PureComponent {
  static async getInitialProps({
    req,
    store,
    isServer,
    query,
  }) {
    const domain = req ? req.headers.host : window.location.host;
    const { slug } = query;
    await store.dispatch(getProject(domain, slug));
    return { isServer };
  }

  render() {
    const {
      global: {
        siteName,
        siteDomain,
      },
      project,
      project: {
        error,
        title,
        slug,
        technology,
        description,
        year,
        images,
        tags,
      },
    } = this.props;

    if (error) {
      return (
        <Invalid error={error} />
      );
    }

    return (
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
        />
        <Schema schemaProject={project} />
      </>
    );
  }
}

const mapStateToProps = ({ global, project }) => ({ global, project });

export default connect(mapStateToProps)(Project);
