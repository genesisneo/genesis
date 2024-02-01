import Image from "next/image";
import { reduxStore } from "@/redux/store";
import { IExperiences, IGlobal } from "@/redux/slices/global/types";
import ElementInView from "../ElementInView/ElementInView";

const Statistics = ({ experiences }: { experiences: Array<IExperiences> }) => {
  const { versionHash }: IGlobal = reduxStore.getState().global;

  return (
    <div className="Experiences">
      {experiences.map(({ image, position, company, location, start, end, responsibilities }: IExperiences, index: number) => (
        <div key={index} className="Experiences__item">
          <Image className="Experiences__item-company" src={`${image}?v=${versionHash}`} alt={company} width={80} height={80} />
          <div className="Experiences__item-details">
            <span className="position">
              <ElementInView text={position} />
            </span>
            <span className="company">
              <ElementInView text={company} />
            </span>
            <span className="location">
              <ElementInView text={location} />
            </span>
            <span className="date">
              <ElementInView text={`${start} – ${end}`} />
            </span>
          </div>
          <div className="Experiences__item-responsibilities">
            {responsibilities.map((item: string, index: number) => (
              <p key={index}>
                <ElementInView text={item} />
              </p>
            ))}
            {experiences.length === index + 1 && (
              <p className="linkedin">
                <ElementInView>
                  For more experiences and a comprehensive list of projects, please visit my LinkedIn profile &nbsp;
                  <a href="https://linkedin.com/in/genesisobtera" target="_blank" rel="noreferrer">
                    linkedin.com/in/genesisobtera
                  </a>
                </ElementInView>
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Statistics;
