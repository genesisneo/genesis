"use client";

import Image from "next/image";
import CountUp from "react-countup";

interface IStatisticsItem {
  count: number;
  image: string;
  symbol: string;
  title: string;
}

interface IStatistics {
  statistics: Array<IStatisticsItem>;
}

const Statistics = ({ statistics }: IStatistics) => (
  <div className="Statistics">
    <div className="Statistics__content">
      {statistics.map(({ count, image, symbol, title }, index) => (
        <div key={index} className="Statistics__content-item">
          <Image className="Statistics__content-icon" src={image} alt={title} width={64} height={64} />
          <span className="Statistics__content-count">
            <CountUp end={count} duration={4} enableScrollSpy scrollSpyOnce />
            {symbol}
          </span>
          <span className="Statistics__content-title" dangerouslySetInnerHTML={{ __html: title }} />
        </div>
      ))}
    </div>
  </div>
);

export default Statistics;
