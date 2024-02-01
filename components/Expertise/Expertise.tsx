import Overview from "../Overview/Overview";
import ElementInView from "../ElementInView/ElementInView";

interface IExpertise {
  subtitle: string;
  title: string;
}

const Expertise = ({ subtitle, title }: IExpertise) => (
  <Overview subtitle={subtitle} title={title}>
    <div className="Overview__children">
      <div className="Overview__children-left">
        <div className="Overview__children-bullet">
          <div className="Overview__children-bullet-title">
            <ElementInView text="Web Design" />
          </div>
          <div className="Overview__children-bullet-description">
            <ElementInView
              text="Embark on a transformative web design journey with me. With over eight years of experience, I specialize in
                  crafting visually stunning, user-centric websites tailored precisely to your unique needs. My web design
                  service ensures your vision materializes with unmatched style and substance, delivering digital experiences
                  that captivate and resonate with your audience."
            />
          </div>
        </div>
        <div className="Overview__children-bullet">
          <div className="Overview__children-bullet-title">
            <ElementInView text="Brand Identity" />
          </div>
          <div className="Overview__children-bullet-description">
            <ElementInView
              text="Discover the essence of your brand with my brand identity service. With years of expertise, I create cohesive
                  brand experiences that define your unique identity. From logo design to comprehensive brand guidelines, I’ll
                  ensure your brand’s story is told consistently and compellingly, leaving a lasting impression on your
                  audience."
            />
          </div>
        </div>
      </div>
      <div className="Overview__children-right">
        <div className="Overview__children-bullet">
          <div className="Overview__children-bullet-title">
            <ElementInView text="Presentation" />
          </div>
          <div className="Overview__children-bullet-description">
            <ElementInView
              text="Elevate your message with my presentation service. With a keen eye for design and an understanding of
                  effective communication, I’ll transform your ideas into engaging visual narratives. Whether it’s for a pitch,
                  a keynote, or a report, I craft presentations that captivate and convey your message with clarity and impact."
            />
          </div>
        </div>
        <div className="Overview__children-bullet">
          <div className="Overview__children-bullet-title">
            <ElementInView text="Prints" />
          </div>
          <div className="Overview__children-bullet-description">
            <ElementInView
              text="Enhance your brand’s physical presence with my print service. From business cards to brochures, I combine
                  design expertise and attention to detail to create stunning print materials that leave a lasting impression.
                  Elevate your brand’s identity and stand out in the tangible world."
            />
          </div>
        </div>
      </div>
    </div>
  </Overview>
);

export default Expertise;
