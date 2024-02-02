import { Metadata } from "next";
import { domain, endpoints } from "@/utilities/endpoints";
import { errorHandler } from "@/utilities/errorHandler";
import { reduxStore } from "@/redux/store";
import { revertAll, setLoading, setProjects } from "@/redux/slices/global";
import { IProjects, IGlobal } from "@/redux/slices/global/types";
import ElementInView from "@/components/ElementInView/ElementInView";
import Hero from "@/components/Hero/Hero";
import Overview from "@/components/Overview/Overview";
import Projects from "@/components/Projects/Projects";
import Schema from "@/components/Schema/Schema";
import Showcase from "@/components/Showcase/Showcase";
import Statistics from "@/components/Statistics/Statistics";

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
    description:
      "I am an accomplished Senior Front-End Engineer based in Winnipeg, Manitoba, Canada, with over eight years of dynamic experience in web design and development spanning various industries.",
    openGraph: {
      title: name,
      siteName: name,
      url: domain,
      type: "website",
      locale: "en_US",
      description:
        "I am an accomplished Senior Front-End Engineer based in Winnipeg, Manitoba, Canada, with over eight years of dynamic experience in web design and development spanning various industries.",
      images: [
        {
          alt: name,
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
        subtitle="Product Designer and Developer"
        title={`Building an <u>Entrancing Presence</u> for your Business.`}
        description={`Reach out to get the conversation started <br class="d-none d-md-block" /> about your digital presence needs.`}
        buttonText="Contact me"
        buttonLink="#contact"
      />

      <Overview
        subtitle="Who I am"
        title="Get to know me"
        description={`I am an accomplished Senior Front-End Engineer based in Winnipeg, Manitoba, Canada, with over eight years of dynamic experience in web design and development spanning various industries. With a strong record of success, I excel in addressing companies’ technological requirements through ingenious solutions that set me apart.`}
        anchorText="More about me"
        anchorLink="/profile"
      />

      <Showcase
        subtitle="Recent works"
        title={`Some of my favorite projects <br class="d-none d-md-block" /> I have done lately.`}
        description={`Feel free to reach out if you want <br class="d-none d-md-block" /> to collaborate with me, or simply have a chat.`}
        buttonText="Contact me"
        buttonLink="#contact"
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

      <Statistics
        statistics={[
          {
            count: 60,
            image: "/images/icon-projects.svg",
            symbol: "+",
            title: `Projects <br class="d-none d-md-block" /> Completed`,
          },
          {
            count: 30,
            image: "/images/icon-clients.svg",
            symbol: "+",
            title: `Satisfied <br class="d-none d-md-block" /> Clients`,
          },
          {
            count: 15,
            image: "/images/icon-countries.svg",
            symbol: "+",
            title: `Countries <br class="d-none d-md-block" /> Served`,
          },
          {
            count: 1500,
            image: "/images/icon-coffee.svg",
            symbol: "+",
            title: `Coffee <br class="d-none d-md-block" /> Cups`,
          },
        ]}
      />

      <Schema />
    </>
  );
}
