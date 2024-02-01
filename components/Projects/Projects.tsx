import Image from "next/image";
import { reduxStore } from "@/redux/store";
import { IProject, IGlobal } from "@/redux/slices/global/types";
import ElementInView from "../ElementInView/ElementInView";

interface IProjects {
  projects: Array<IProject>;
}

const Projects = ({ projects }: IProjects) => {
  const { versionHash }: IGlobal = reduxStore.getState().global;

  return (
    <div className="Projects">
      {projects.map(({ id, thumbnail, title, slug, year }: IProject) => (
        <a key={id} className="Projects__project" href={`/project/${slug}`}>
          <div className="Projects__project-thumbnail">
            <ElementInView>
              <Image
                fill
                src={`${thumbnail}?v=${versionHash}`}
                alt={title}
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAABCAQAAABeK7cBAAAAC0lEQVR42mNkAAIAAAoAAv/lxKUAAAAASUVORK5CYII="
                placeholder="blur"
                sizes="320px"
              />
            </ElementInView>
            <span className="Projects__project-arrow" />
          </div>
          <small className="Projects__project-subtitle">
            <ElementInView text={`${year}`} />
          </small>
          <span className="Projects__project-title">
            <ElementInView text={title} />
          </span>
        </a>
      ))}
    </div>
  );
};

export default Projects;
