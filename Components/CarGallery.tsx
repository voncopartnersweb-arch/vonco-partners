'use client';

import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useMemo, useState } from 'react';
import { carDetailStyles as styles } from '@/lib/uiStyles';

type GalleryView = 'full' | 'detail-left' | 'detail-right';

type GallerySlide = {
  src: string;
  view: GalleryView;
};

type CarGalleryProps = {
  carName: string;
  mainImage: string;
  galleryImages?: readonly string[];
  galleryLabel: string;
  previousLabel: string;
  nextLabel: string;
};

export default function CarGallery({
  carName,
  mainImage,
  galleryImages = [],
  galleryLabel,
  previousLabel,
  nextLabel,
}: CarGalleryProps) {
  const slides = useMemo<GallerySlide[]>(() => {
    const uniqueImages = [...new Set([mainImage, ...galleryImages])];
    const items: GallerySlide[] = uniqueImages.map((src) => ({
      src,
      view: 'full',
    }));

    if (items.length < 3) {
      items.push({ src: mainImage, view: 'detail-left' });
    }
    if (items.length < 3) {
      items.push({ src: mainImage, view: 'detail-right' });
    }

    return items;
  }, [galleryImages, mainImage]);
  const [activeIndex, setActiveIndex] = useState(0);

  const showPrevious = () => {
    setActiveIndex((index) => (index - 1 + slides.length) % slides.length);
  };

  const showNext = () => {
    setActiveIndex((index) => (index + 1) % slides.length);
  };

  const activeSlide = slides[activeIndex];
  const imageClass =
    activeSlide.view === 'detail-left'
      ? styles.galleryImageDetailLeft
      : activeSlide.view === 'detail-right'
        ? styles.galleryImageDetailRight
        : styles.galleryImage;

  return (
    <div
      className={styles.imageGallery}
      role='region'
      aria-label={`${carName}: ${galleryLabel}`}
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === 'ArrowLeft') showPrevious();
        if (event.key === 'ArrowRight') showNext();
      }}
    >
      <div className={styles.galleryStage}>
        <Image
          key={`${activeSlide.src}-${activeSlide.view}`}
          src={activeSlide.src}
          alt={`${carName} — ${activeIndex + 1}`}
          fill
          className={imageClass}
          priority={activeIndex === 0}
          sizes='(max-width: 1024px) 100vw, 55vw'
        />

        <span className={styles.galleryCounter} aria-live='polite'>
          {activeIndex + 1} / {slides.length}
        </span>

        <button
          type='button'
          className={`${styles.galleryNav} ${styles.galleryPrev}`}
          onClick={showPrevious}
          aria-label={previousLabel}
        >
          <ChevronLeft aria-hidden='true' />
        </button>
        <button
          type='button'
          className={`${styles.galleryNav} ${styles.galleryNext}`}
          onClick={showNext}
          aria-label={nextLabel}
        >
          <ChevronRight aria-hidden='true' />
        </button>
      </div>

      <div className={styles.galleryThumbs} aria-label={galleryLabel}>
        {slides.map((slide, index) => (
          <button
            key={`${slide.src}-${slide.view}`}
            type='button'
            className={`${styles.galleryThumb} ${index === activeIndex ? styles.galleryThumbActive : ''}`}
            onClick={() => setActiveIndex(index)}
            aria-label={`${galleryLabel}: ${index + 1}`}
            aria-current={index === activeIndex ? 'true' : undefined}
          >
            <Image
              src={slide.src}
              alt=''
              fill
              className={
                slide.view === 'detail-left'
                  ? styles.galleryThumbDetailLeft
                  : slide.view === 'detail-right'
                    ? styles.galleryThumbDetailRight
                    : styles.galleryThumbImage
              }
              sizes='96px'
            />
          </button>
        ))}
      </div>
    </div>
  );
}
