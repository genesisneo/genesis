import { connect } from 'react-redux';

const Schema = ({
  schemaProject,
  global: {
    siteName,
    siteDescription,
    siteDomain,
  },
}) => {
  const isProject = schemaProject !== undefined;

  // https://schema.org/Organization
  const schemaPartialHome = `
    {
      "@context": "http://schema.org",
      "@type": "Organization",
      "name": "${siteName}",
      "legalName" : "${siteName}",
      "brand": "${siteName}",
      "url": "${siteDomain}",
      "description": "${siteDescription}",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Dubai, United Arab Emirates",
        "postalCode": "Dubai",
        "streetAddress": "Downtown Dubai"
      },
      "sameAs": [
        "https://linkedin.com/in/genesisobtera",
        "https://facebook.com/genesis.neo",
        "https://instagram.com/genesis_neo",
        "https://twitter.com/genesis_neo",
        "https://github.com/genesisneo", 
        "https://flickr.com/photos/genesis_neo",
        "https://youtube.com/genesisobtera",
        "https://dribbble.com/genesis_neo",
        "https://stackoverflow.com/users/7702792/neo-genesis",
        "https://www.behance.net/genesis_neo",
        "https://obtera.com/author/genesis"
      ]
    }
  `;

  const schemaPartialProject = `
    {
      "@context": "http://schema.org",
      "@type": "CreativeWork",
      "author": "${siteName}",
      "image": "${siteDomain}${isProject ? schemaProject.images[0] : null}",
      "name": "${isProject ? schemaProject.title : null}"
    }
  `;

  const schemaPartial = isProject
    ? schemaPartialProject
    : schemaPartialHome;

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: schemaPartial,
        }}
      />

      {!schemaProject && (
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: `
              {
                "@context": "http://schema.org",
                "@type": "WebSite",
                "name": "${siteName}",
                "url": "${siteDomain}"
              }
            `,
          }}
        />
      )}
    </>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Schema);
