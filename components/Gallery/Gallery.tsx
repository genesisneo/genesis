"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Navigation, Pagination } from "swiper/modules";
import { reduxStore } from "@/redux/store";
import { IGlobal } from "@/redux/slices/global/types";
import "swiper/css/bundle";

interface IGallery {
  title: string;
  gallery: Array<string>;
}

const Gallery = ({ title = "Genesis Mallorca Obtera", gallery = [] }: IGallery) => {
  const { versionHash }: IGlobal = reduxStore.getState().global;

  const showSwiper = gallery.length > 1;
  const imageTag = ({ name, image }: { name: string; image: string }) => (
    <Image
      className="Gallery__image"
      src={`${image}?v=${versionHash}`}
      alt={name}
      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAABCAQAAABeK7cBAAAAC0lEQVR42mNkAAIAAAoAAv/lxKUAAAAASUVORK5CYII="
      placeholder="blur"
      width={1440}
      height={900}
    />
  );

  const projectImage = showSwiper ? (
    <Swiper keyboard loop navigation pagination={{ clickable: true }} modules={[Keyboard, Navigation, Pagination]}>
      {gallery.map((image, index) => {
        const itemKey = `project-${index}`;
        return <SwiperSlide key={itemKey}>{imageTag({ name: title, image })}</SwiperSlide>;
      })}
    </Swiper>
  ) : (
    imageTag({ name: title, image: gallery[0] })
  );

  return (
    <div className="Gallery">
      <div className="Gallery__content">{projectImage}</div>
    </div>
  );
};

export default Gallery;
