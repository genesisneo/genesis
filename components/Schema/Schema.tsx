import { reduxStore } from "@/redux/store";
import { IGlobal } from "@/redux/slices/global/types";

const Schema = () => {
  const { name, description, domain, project }: IGlobal = reduxStore.getState().global;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            /* eslint-disable indent */
            "id" in project
              ? JSON.stringify({
                  "@context": "http://schema.org",
                  "@type": "CreativeWork",
                  author: name,
                  image: `${domain}${project.images[0]}`,
                  name: project.title,
                })
              : JSON.stringify({
                  "@context": "http://schema.org",
                  "@type": "WebSite",
                  name: name,
                  legalName: name,
                  brand: name,
                  url: domain,
                  description: description,
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: "Winnipeg, Manitoba, Canada",
                    postalCode: "R3K1G1",
                    streetAddress: "Shelley Street",
                  },
                  sameAs: [
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
                    "https://obtera.com/author/genesis",
                  ],
                }),
          /* eslint-enable indent */
        }}
      />
    </>
  );
};

export default Schema;
