import { MetadataRoute } from "next";
import { domain, endpoints } from "@/utilities/endpoints";
import { IProject, IProjects } from "@/redux/slices/global/types";

const sitemapXml = (portfolio: IProjects): MetadataRoute.Sitemap => {
  const siteDomain: string = "https://genesis.obtera.com";
  const projectsTags: string[] = [];
  const projectsTechnologies: string[] = [];
  const projectsXml: MetadataRoute.Sitemap = [];
  const projectsTagsXml: MetadataRoute.Sitemap = [];
  const projectsTechnologiesXml: MetadataRoute.Sitemap = [];

  portfolio.forEach((project: IProject) => {
    const { slug, technology: technologies, tags } = project;

    // project
    projectsXml.push({
      url: `${siteDomain}/project/${slug}`,
      changeFrequency: "daily",
      priority: 1,
    });

    // tags
    tags.forEach((tag) => {
      if (!projectsTags.includes(tag)) {
        projectsTags.push(tag);
        projectsTagsXml.push({
          url: `${siteDomain}/tag/${tag}`,
          changeFrequency: "daily",
          priority: 1,
        });
      }
    });

    // techology
    technologies.forEach((technology) => {
      if (!projectsTechnologies.includes(technology)) {
        projectsTechnologies.push(technology);
        projectsTechnologiesXml.push({
          url: `${siteDomain}/technology/${technology}`,
          changeFrequency: "daily",
          priority: 1,
        });
      }
    });
  });

  return [
    {
      url: siteDomain,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${siteDomain}/profile`,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${siteDomain}/projects`,
      changeFrequency: "daily",
      priority: 1,
    },
    ...projectsXml,
    ...projectsTagsXml,
    ...projectsTechnologiesXml,
  ];
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const requestProjects = await fetch(`${domain}/${endpoints.projects}`);
  const dataProjects = await requestProjects.json();
  return sitemapXml(dataProjects.projects || []);
}
