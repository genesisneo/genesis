import { Metadata } from "next";
import { domain, endpoints } from "@/utilities/endpoints";
import { errorHandler } from "@/utilities/errorHandler";
import { reduxStore } from "@/redux/store";
import { revertAll, setLoading, setProfile } from "@/redux/slices/global";
import { IProfile, IGlobal } from "@/redux/slices/global/types";
import Experiences from "@/components/Experiences/Experiences";
import Expertise from "@/components/Expertise/Expertise";
import Hero from "@/components/Hero/Hero";
import Overview from "@/components/Overview/Overview";
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
    const requestProfile = await fetch(`${domain}/${endpoints.profile}`);
    const dataProfile = await requestProfile.json();
    reduxStore.dispatch(setProfile(dataProfile?.profile || {}));
  } catch (error: any) {
    errorHandler(error);
  }
  reduxStore.dispatch(setLoading(false));
}

export async function generateMetadata(): Promise<Metadata> {
  const { name, domain }: IGlobal = reduxStore.getState().global;

  return {
    title: "Profile",
    description: "I am a Senior Front-End Engineer with a decade of experiences in creating user-centric web applications.",
    openGraph: {
      title: `Profile | ${name}`,
      siteName: name,
      url: `${domain}/profile`,
      type: "website",
      locale: "en_US",
      description: "I am a Senior Front-End Engineer with a decade of experiences in creating user-centric web applications.",
      images: [
        {
          alt: `Profile | ${name}`,
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
  const profile: IProfile = reduxStore.getState().global.profile;

  return (
    <>
      <Hero
        subtitle="Who I Am"
        title={`Get to <u>know</u> me better.`}
        description="I am a Senior Front-End Engineer with a decade of experiences in creating user-centric web
        applications. Proficient in modern web technologies like Node, Express, React, Vue, TypeScript,
        and Electron. I specialize in optimizing performance and enhancing conversions through
        meticulous A/B testing. As a skilled team leader, I foster innovation, promote cross-functional
        collaboration, and consistently deliver high-quality web experiences. My passion lies in pushing
        the boundaries of web development to create innovative, user-focused solutions."
      />

      <Overview subtitle="Experiences" title="List of awesome wokplaces" />

      <Showcase>{profile.experiences && <Experiences experiences={profile.experiences} />}</Showcase>

      <Expertise subtitle="Expertise" title={`The skills I learned <br class="d-none d-md-block" /> and mastered.`} />

      <Schema />
    </>
  );
}
