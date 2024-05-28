import { Metadata } from "next";
import { domain, endpoints } from "@/utilities/endpoints";
import { errorHandler } from "@/utilities/errorHandler";
import { reduxStore } from "@/redux/store";
import { revertAll, setLoading, setProjects } from "@/redux/slices/global";
import { IProjects, IGlobal } from "@/redux/slices/global/types";
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

export async function generateMetadata(): Promise<Metadata> {
  const { name, domain }: IGlobal = reduxStore.getState().global;

  return {
    title: "Projects",
    description:
      "The projects showcased below represent my extensive experience as a Senior UI/UX Designer and Engineer. I’m exceptionally proud of my contributions to these endeavors.",
    openGraph: {
      title: `Projects | ${name}`,
      siteName: name,
      url: `${domain}/projects`,
      type: "website",
      locale: "en_US",
      description:
        "The projects showcased below represent my extensive experience as a Senior UI/UX Designer and Engineer. I’m exceptionally proud of my contributions to these endeavors.",
      images: [
        {
          alt: `Projects | ${name}`,
          url: `${domain}/genesis.jpg`,
          width: 1440,
          height: 900,
        },
      ],
    },
  };
}

export default async function Page() {
  await getData();
  const projects: IProjects = reduxStore.getState().global.projects;

  if (!Object.keys(projects).length) {
    return null;
  }

  return (
    <>
      <Hero
        subtitle="Portfolio"
        title={`All the projects I take <u>great pride</u> in working on.`}
        description="The projects showcased below represent my extensive experience as a Senior UI/UX Designer and Engineer. I’m exceptionally
        proud of my contributions to these endeavors. They embody my unwavering commitment to delivering excellence and my passion for
        creating innovative solutions."
      />

      <Overview subtitle="Projects" title="Check out some of my works." />

      <Showcase>
        <Projects projects={[...projects].sort(() => 0.5 - Math.random())} />
      </Showcase>

      <Expertise subtitle="Expertise" title={`The skills I learned <br class="d-none d-md-block" /> and mastered.`} />

      <Schema />
    </>
  );
}
