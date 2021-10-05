import Card from '../Card/Card';
import styles from './Cards.module.scss';

const Cards = ({ portfolio }) => (
  <div className={styles.Cards}>
    {portfolio.map(({
      id,
      thumbnail,
      title,
      slug,
    }) => (
      <Card
        key={id}
        thumbnail={thumbnail}
        title={title}
        slug={slug}
      />
    ))}
  </div>
);

export default Cards;
