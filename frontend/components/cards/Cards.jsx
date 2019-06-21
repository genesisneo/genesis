import React from 'react';
import Card from '../card/Card';
import './Cards.scss';

class Cards extends React.Component {
  state = {
    portfolio: [],
  };

  componentDidMount() {
    fetch('/api/genesis')
      .then(res => res.json())
      .then(data => this.setState({ portfolio: data.portfolio }));
  }

  render() {
    const {
      portfolio,
    } = this.state;

    const isPortfolioEmpty = portfolio.length === 0;
    const shuffledPortfolio = portfolio.sort(() => Math.random() - 0.5);

    return (
      <div className="Cards">
        {!isPortfolioEmpty && shuffledPortfolio.map(({
          id,
          thumbnail,
          title,
          description,
        }) => (
          <Card
            key={id}
            id={id}
            thumbnail={thumbnail}
            title={title}
            description={description}
          />
        ))}
      </div>
    );
  }
}

export default Cards;
