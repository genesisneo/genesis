import React from 'react';
import Swiper from 'react-id-swiper';
import { connect } from 'react-redux';
import styles from './Gallery.module.scss';

const Gallery = ({
  title = 'Genesis Mallorca Obtera',
  gallery = [],
  global: {
    imagePlaceholder,
    versionHash,
  },
}) => {
  if (!gallery.length) {
    return null;
  }

  const showSwiper = gallery.length > 1;

  const imageTag = ({ name, image }) => (
    <img
      className={`${styles['Gallery-image']} ${showSwiper ? 'swiper-lazy' : 'lazyload'}`}
      loading="lazy"
      alt={name}
      title={name}
      src={imagePlaceholder}
      data-src={`${image}?v=${versionHash}`}
    />
  );

  const swiperOptions = {
    centeredSlides: true,
    grabCursor: true,
    lazy: true,
    speed: 300,
    loop: true,
    autoplay: {
      delay: 5000,
    },
    keyboard: {
      enabled: true,
      onlyInViewport: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  };

  const projectImage = showSwiper
    ? (
      <Swiper {...swiperOptions}>
        {gallery.map((image, index) => {
          const itemKey = `project-${index}`;
          return (
            <div key={itemKey}>
              {imageTag({ name: title, image })}
            </div>
          );
        })}
      </Swiper>
    )
    : imageTag({ name: title, image: gallery[0] });

  return (
    <div className={styles.Gallery}>
      {projectImage}
    </div>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Gallery);
