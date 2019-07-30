import React from 'react';
import { connect } from 'react-redux';
import Card from '../card/Card';
import Loading from '../loading/Loading';
import NotFound from '../notfound/NotFound';
import { getPortfolio } from '../../redux/actions';
import './Cards.scss';

class Cards extends React.Component {
  componentDidMount() {
    // eslint-disable-next-line no-shadow
    const { getPortfolio } = this.props;
    getPortfolio();
  }

  shouldComponentUpdate(nextState) {
    const {
      genesis: {
        portfolio: currentPortfolio
      }
    } = this.props;
    const {
      genesis: {
        portfolio: nextPortfolio
      }
    } = nextState;
    return (nextPortfolio !== currentPortfolio) ? nextPortfolio : false;
  }

  render() {
    const {
      genesis: {
        portfolio
      }
    } = this.props;

    if (!portfolio.length) {
      return (
        <div className="Cards__container">
          <Loading />
        </div>
      );
    }

    if (portfolio.error) {
      return (
        <div className="Cards__container">
          <NotFound />
        </div>
      );
    }

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

const mapStateToProps = ({ genesis }) => ({ genesis });

export default connect(mapStateToProps, { getPortfolio })(Cards);
