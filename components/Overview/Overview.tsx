import { ReactNode } from "react";
import ElementInView from "../ElementInView/ElementInView";

interface IOverview {
  subtitle: string;
  title: string;
  description?: string;
  anchorText?: string;
  anchorLink?: string;
  children?: ReactNode;
}

const Overview = ({ subtitle, title, description, anchorText, anchorLink, children }: IOverview) => (
  <section className="Overview">
    <div className="Overview__content">
      <h4 className="Overview__content-subtitle">
        <ElementInView text={subtitle} />
      </h4>
      <h2 className="Overview__content-title">
        <ElementInView text={title} />
      </h2>
      {description && (
        <p className="Overview__content-description">
          <ElementInView text={description} />
        </p>
      )}
      {anchorText && anchorLink && (
        <ElementInView>
          <a className="Overview__content-link link" href={anchorLink}>
            {anchorText}
          </a>
        </ElementInView>
      )}
      {children}
    </div>
  </section>
);

export default Overview;
