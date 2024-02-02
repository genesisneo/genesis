import { Metadata } from "next";
import { domain, endpoints } from "@/utilities/endpoints";
import { errorHandler } from "@/utilities/errorHandler";
import { reduxStore } from "@/redux/store";
import { revertAll, setLoading, setProject, setProjects } from "@/redux/slices/global";
import { IProject, IProjects, IGlobal } from "@/redux/slices/global/types";
import ElementInView from "@/components/ElementInView/ElementInView";
import Gallery from "@/components/Gallery/Gallery";
import Project from "@/components/Project/Project";
import Projects from "@/components/Projects/Projects";
import Schema from "@/components/Schema/Schema";
import Showcase from "@/components/Showcase/Showcase";

/*
 * ⚠️ NOTES:
 * When doing SSR, we need to use 'reduxStore.getState()' function to access redux states
 * and use 'reduxStore.dispatch' to dispatch a function, to dispatch redux actions. The
 * 'useSelector' and 'useDispatch' are CSR only and it will show an error if used on SSR.
 *
 * Reference:
 * https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#fetching-data-on-the-server-with-fetch
 */

async function getData(slug: string) {
  reduxStore.dispatch(revertAll());
  reduxStore.dispatch(setLoading(true));
  try {
    const requestProject = await fetch(`${domain}/${endpoints.project}/${slug}`);
    const dataProject = await requestProject.json();
    reduxStore.dispatch(setProject(dataProject?.project || {}));
    const requestProjects = await fetch(`${domain}/${endpoints.projects}`);
    const dataProjects = await requestProjects.json();
    reduxStore.dispatch(setProjects(dataProjects?.projects || []));
  } catch (error: any) {
    errorHandler(error);
  }
  reduxStore.dispatch(setLoading(false));
}

export async function generateMetadata({ params: { slug } }: { params: { slug: string } }): Promise<Metadata> {
  await getData(slug);
  const project: IProject | {} = reduxStore.getState().global.project;
  const { name, domain }: IGlobal = reduxStore.getState().global;

  if (!("id" in project)) {
    return {};
  }

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: `${slug[0].toUpperCase() + slug.slice(1)} | ${name}`,
      siteName: name,
      url: `${domain}/project/${slug}`,
      type: "website",
      locale: "en_US",
      description: project.description,
      images: [
        {
          alt: `${slug[0].toUpperCase() + slug.slice(1)} | ${name}`,
          url: project.images[0],
          width: 1440,
          height: 900,
        },
      ],
    },
  };
}

export default async function Page({ params: { slug } }: { params: { slug: string } }) {
  await getData(slug);
  const project: IProject | {} = reduxStore.getState().global.project;
  const projects: IProjects = reduxStore.getState().global.projects;

  return !("id" in project) ? null : (
    <>
      <Gallery title={project.title} gallery={project.images} />

      <Showcase>
        <Project project={project} />
      </Showcase>

      <Showcase
        isTransparent
        subtitle="More projects"
        title={`Check out other projects <br class="d-none d-md-block" /> I completed.`}
      >
        <>
          <Projects projects={[...projects].sort(() => 0.5 - Math.random()).slice(0, 6)} />
          <ElementInView>
            <a className="Showcase__link link" href="/projects">
              View all projects
            </a>
          </ElementInView>
        </>
      </Showcase>

      <Schema />
    </>
  );
}
