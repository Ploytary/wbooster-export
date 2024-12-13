import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
import { findHtmlElement } from '../../helpers/dom';

export function initManufacturersSection() {
  const swiper = new Swiper('.manufacturers-section .brand-slider', {
    modules: [Navigation],
    loop: true,
    navigation: {
      nextEl: '.brand-slider__button--next',
      prevEl: '.brand-slider__button--prev',
    },
    spaceBetween: 18,
  });

  controlSlidesCount(swiper);
}

function controlSlidesCount(swiper: Swiper) {
  const swiperContainerElement = findHtmlElement('.manufacturers-section__slider-wrapper');
  const observer = new ResizeObserver(() => {
    const containerWidth = swiperContainerElement.clientWidth;
    const slide = swiper.slides[0];
    const slideWidth = slide.firstElementChild?.clientWidth ?? 240;
    const gapDigit =
      (typeof swiper.params.spaceBetween === 'string'
        ? parseInt(swiper.params.spaceBetween)
        : swiper.params.spaceBetween) ?? 0;

    let slidesPerView = 1;
    while (isSlidesFits(slidesPerView + 1, slideWidth, containerWidth, gapDigit)) {
      slidesPerView++;
    }

    swiper.el.style.width = `${slidesPerView * slideWidth + 18 * (slidesPerView - 1)}px`;
    swiper.params.slidesPerView = slidesPerView;
  });
  observer.observe(swiperContainerElement);
}

function isSlidesFits(count: number, slideWidth: number, sliderWidth: number, gap: number) {
  return sliderWidth - slideWidth * count - gap * (count - 1) >= 0;
}
