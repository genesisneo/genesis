import ElementInView from "../ElementInView/ElementInView";

interface IHero {
  subtitle: string;
  title: string;
  description: string;
  buttonText?: string;
  buttonLink?: string;
}

const Hero = ({ subtitle, title, description, buttonText, buttonLink }: IHero) => (
  <section className="Hero">
    <div className="Hero__ornaments" />
    <div className="Hero__content">
      <h4 className="Hero__content-subtitle">
        <ElementInView text={subtitle} />
      </h4>
      <h1 className="Hero__content-title">
        <ElementInView text={title} />
      </h1>
      <p className="Hero__content-description">
        <ElementInView text={description} />
      </p>
      {buttonText && buttonLink && (
        <ElementInView>
          <a className="Hero__content-button button" href={buttonLink}>
            {buttonText}
          </a>
        </ElementInView>
      )}
    </div>
  </section>
);

export default Hero;
