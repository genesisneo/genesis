export interface IExperiences {
  image: string;
  position: string;
  company: string;
  location: string;
  start: string;
  end: string;
  responsibilities: string[];
}

export interface IProfile {
  experiences?: Array<IExperiences>;
}

export interface IProject {
  id: number;
  thumbnail: string;
  title: string;
  slug: string;
  description: string;
  year: number;
  images: string[];
  technology: string[];
  tags: string[];
}

export interface IProjects extends Array<IProject> {}

export interface IGlobal {
  name: string;
  description: string;
  domain: string;
  versionHash: string;
  loading: boolean;
  profile: IProfile | {};
  project: IProject | {};
  projects: IProjects | [];
}
