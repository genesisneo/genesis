import { IProject } from "@/redux/slices/global/types";
import ElementInView from "../ElementInView/ElementInView";

const Project = ({ project: { year, title, technology, tags, description } }: { project: IProject }) => (
  <div className="Project">
    <div className="Project__details">
      <div className="Project__details-information">
        <h4 className="Project__details-information-subtitle">
          <ElementInView text={`${year}`} />
        </h4>
        <h2 className="Project__details-information-title">
          <ElementInView text={title} />
        </h2>
        <h4 className="Project__details-information-subtitle">
          <ElementInView text="Technology" />
        </h4>
        <p className="Project__details-information-links">
          {technology.length &&
            technology.map((item: string, index: number) => (
              <a key={index} className="Project__details-information-link" href={`/technology/${item}`}>
                <ElementInView text={item} />
              </a>
            ))}
        </p>
        <h4 className="Project__details-information-subtitle">
          <ElementInView text="Tags" />
        </h4>
        <p className="Project__details-information-links">
          {tags.length &&
            tags.map((item: string, index: number) => (
              <a key={index} className="Project__details-information-link" href={`/tag/${item}`}>
                <ElementInView text={item} />
              </a>
            ))}
        </p>
      </div>
      <p className="Project__details-description">
        <ElementInView text={description} />
      </p>
    </div>
  </div>
);

export default Project;
