import { Metadata } from "next";
import { domain, endpoints } from "@/utilities/endpoints";
import { errorHandler } from "@/utilities/errorHandler";
import { reduxStore } from "@/redux/store";
import { revertAll, setLoading, setProjects } from "@/redux/slices/global";
import { IProject, IProjects, IGlobal } from "@/redux/slices/global/types";
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

export async function generateMetadata({ params: { tag } }: { params: { tag: string } }): Promise<Metadata> {
  const { name, domain }: IGlobal = reduxStore.getState().global;

  return {
    title: `Tag - ${tag[0].toUpperCase() + tag.slice(1)}`,
    description: `All ${tag} projects I completed. Each project reflects not only my technical skills but also my ability to collaborate effectively within dynamic teams.`,
    openGraph: {
      title: `Tag - ${tag[0].toUpperCase() + tag.slice(1)} | ${name}`,
      siteName: name,
      url: `${domain}/tag/${tag}`,
      type: "website",
      locale: "en_US",
      description: `All ${tag} projects I completed. Each project reflects not only my technical skills but also my ability to collaborate effectively within dynamic teams.`,
      images: [
        {
          alt: `Tag - ${tag[0].toUpperCase() + tag.slice(1)} | ${name}`,
          url: `${domain}/genesis.jpg`,
          width: 1440,
          height: 900,
        },
      ],
    },
  };
}

export default async function Page({ params: { tag } }: { params: { tag: string } }) {
  await getData();
  const projects: IProjects = reduxStore.getState().global.projects;

  return (
    <>
      <Hero
        subtitle="Portfolio"
        title={`All <u>${tag}</u> projects I completed.`}
        description="Each project reflects not only my technical skills but also my ability to collaborate effectively
        within dynamic teams. Together, we’ve achieved remarkable results in web design and development across various industries."
      />

      <Overview subtitle="Tag" title={`Check out my <br class="d-none d-md-block" /> ${tag} projects.`} />

      <Showcase>
        <Projects projects={projects.filter((project: IProject) => project.tags.includes(tag))} />
      </Showcase>

      <Expertise subtitle="Expertise" title={`The skills I learned <br class="d-none d-md-block" /> and mastered.`} />

      <Schema />
    </>
  );
}
