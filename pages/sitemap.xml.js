import React from 'react';
import axios from 'axios';

const { siteDomain } = require('../config.json');

const sitemapXml = ({ portfolio }) => {
  const projectsTags = [];
  const projectsTechnologies = [];
  let projectsXml = '';
  let projectsTagsXml = '';
  let projectsTechnologiesXml = '';

  portfolio.forEach((project) => {
    const {
      id,
      technology: technologies,
      tags,
    } = project;

    // project
    const projectUrl = `${siteDomain}/project/${id}`;
    projectsXml += `
      <url>
        <loc>${projectUrl}</loc>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
      </url>
    `;

    // tags
    tags.forEach((tag) => {
      if (!projectsTags.includes(tag)) {
        projectsTags.push(tag);
        const projectTagUrl = `${siteDomain}/tag/${tag}`;
        projectsTagsXml += `
          <url>
            <loc>${projectTagUrl}</loc>
            <changefreq>daily</changefreq>
            <priority>1.0</priority>
          </url>
        `;
      }
    });

    // techology
    technologies.forEach((technology) => {
      if (!projectsTechnologies.includes(technology)) {
        projectsTechnologies.push(technology);
        const projectTechnologyUrl = `${siteDomain}/technology/${technology}`;
        projectsTechnologiesXml += `
          <url>
            <loc>${projectTechnologyUrl}</loc>
            <changefreq>daily</changefreq>
            <priority>1.0</priority>
          </url>
        `;
      }
    });
  });

  return `
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9/">
      <url>
        <loc>${siteDomain}/</loc>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
      </url>
      <url>
        <loc>${siteDomain}/about</loc>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
      </url>
      ${projectsXml}
      ${projectsTagsXml}
      ${projectsTechnologiesXml}
    </urlset>
  `;
};

class Sitemap extends React.PureComponent {
  static async getInitialProps({ req, res }) {
    const domain = req ? req.headers.host : window.location.host;
    const protocol = domain.indexOf('localhost') !== -1 ? 'http://' : 'https://';
    const { data } = await axios.get(`${protocol}${domain}/api`);

    res.setHeader('Content-Type', 'text/xml');
    res.write(sitemapXml(data));
    res.end();
  }
}

export default Sitemap;
