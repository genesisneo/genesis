import { Metadata } from "next";
import { domain, endpoints } from "@/utilities/endpoints";
import { errorHandler } from "@/utilities/errorHandler";
import { reduxStore } from "@/redux/store";
import { revertAll, setLoading, setProjects } from "@/redux/slices/global";
import { IProject, IProjects, IGlobal } from "@/redux/slices/global/types";
import data from "@/app/api/data/data.json";
import Expertise from "@/components/Expertise/Expertise";
import Hero from "@/components/Hero/Hero";
import Overview from "@/components/Overview/Overview";
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

async function getData() {
  reduxStore.dispatch(revertAll());
  reduxStore.dispatch(setLoading(true));
  try {
    const requestProjects = await fetch(`${domain}/${endpoints.projects}`);
    const dataProjects = await requestProjects.json();
    reduxStore.dispatch(setProjects(dataProjects?.projects || []));
  } catch (error: any) {
    errorHandler(error);
  }
  reduxStore.dispatch(setLoading(false));
}

export async function generateMetadata({ params }: { params: Promise<{ technology: string }> }): Promise<Metadata> {
  const { technology } = await params;
  const { name, domain }: IGlobal = reduxStore.getState().global;

  return {
    title: `Technology - ${technology[0].toUpperCase() + technology.slice(1)}`,
    description: `All ${technology} projects I completed. Each project reflects not only my technical skills but also my ability to collaborate effectively within dynamic teams.`,
    openGraph: {
      title: `Technology - ${technology[0].toUpperCase() + technology.slice(1)} | ${name}`,
      siteName: name,
      url: `${domain}/technology/${technology}`,
      type: "website",
      locale: "en_US",
      description: `All ${technology} projects I completed. Each project reflects not only my technical skills but also my ability to collaborate effectively within dynamic teams.`,
      images: [
        {
          alt: `Technology - ${technology[0].toUpperCase() + technology.slice(1)} | ${name}`,
          url: `${domain}/genesis.jpg`,
          width: 1440,
          height: 900,
        },
      ],
    },
  };
}

export default async function Page({ params }: { params: Promise<{ technology: string }> }) {
  const { technology } = await params;
  await getData();
  const projects: IProjects = reduxStore.getState().global.projects;

  if (!Object.keys(projects).length) {
    return null;
  }

  return (
    <>
      <Hero
        subtitle="Portfolio"
        title={`All <u>${technology}</u> projects I completed.`}
        description="Each project reflects not only my technical skills but also my ability to collaborate effectively
        within dynamic teams. Together, we’ve achieved remarkable results in web design and development across various industries."
      />

      <Overview subtitle="Technology" title={`Check out my <br class="d-none d-md-block" /> ${technology} projects.`} />

      <Showcase>
        <Projects projects={projects.filter((project: IProject) => project.technology.includes(technology))} />
      </Showcase>

      <Expertise subtitle="Expertise" title={`The skills I learned <br class="d-none d-md-block" /> and mastered.`} />

      <Schema />
    </>
  );
}
