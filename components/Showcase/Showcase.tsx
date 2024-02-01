import { ReactNode } from "react";
import ElementInView from "../ElementInView/ElementInView";

interface IShowcase {
  subtitle?: string;
  title?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  children: ReactNode;
  isTransparent?: boolean;
}

const Showcase = ({ subtitle, title, description, buttonText, buttonLink, children, isTransparent = false }: IShowcase) => (
  <section className="Showcase">
    <div className={`Showcase__content ${isTransparent ? "is-transparent" : ""}`}>
      {subtitle && (
        <h4 className="Showcase__content-subtitle">
          <ElementInView text={subtitle} />
        </h4>
      )}
      {title && (
        <h2 className="Showcase__content-title">
          <ElementInView text={title} />
        </h2>
      )}
      {description && (
        <p className="Showcase__content-description">
          <ElementInView text={description} />
        </p>
      )}
      {buttonText && buttonLink && (
        <ElementInView>
          <a className="Showcase__content-button button" href={buttonLink}>
            {buttonText}
          </a>
        </ElementInView>
      )}
      {children}
    </div>
  </section>
);

export default Showcase;
