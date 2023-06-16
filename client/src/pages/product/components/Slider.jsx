import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Thumbs, Mousewheel } from "swiper"
import "swiper/css"
import "swiper/css/navigation"
import { useState } from "react"
import { Image } from "cloudinary-react"

export default function Slider({ slides }) {
  const [imagesNavSlider, setImagesNavSlider] = useState(null)
  return (
    <section className="slider sticky top-0 left-0">
      <div className="slider__flex">
        <div className="slider__col min-w-full sm:min-w-[80px] overflow-y-auto">
          <div className="slider__prev"></div>

          <div className="slider__thumbs">
            <Swiper
              onSwiper={setImagesNavSlider}
              direction="vertical"
              spaceBetween={24}
              slidesPerView={3}
              navigation={{
                nextEl: ".slider__next",
                prevEl: ".slider__prev",
              }}
              className="swiper-container1"
              breakpoints={{
                0: {
                  direction: "horizontal",
                },
                768: {
                  direction: "vertical",
                },
              }}
              modules={[Navigation, Thumbs]}
            >
              {slides.map((slide, index) => {
                return (
                  <SwiperSlide key={index}>
                    <div className="slider__image">
                      <Image
                        alt={slide.publicId}
                        cloudName={import.meta.env.VITE_CLOUD_NAME}
                        publicId={slide.public_id}
                      />
                    </div>
                  </SwiperSlide>
                )
              })}
            </Swiper>
          </div>

          <div className="slider__next"></div>
        </div>

        <div className="slider__images">
          <Swiper
            // thumbs={{ swiper: imagesNavSlider }}
            thumbs={{
              swiper:
                imagesNavSlider && !imagesNavSlider.destroyed
                  ? imagesNavSlider
                  : null,
            }}
            direction="horizontal"
            slidesPerView={1}
            spaceBetween={32}
            mousewheel={true}
            navigation={{
              nextEl: ".slider__next",
              prevEl: ".slider__prev",
            }}
            breakpoints={{
              0: {
                direction: "horizontal",
              },
              768: {
                direction: "horizontal",
              },
            }}
            className="swiper-container2"
            modules={[Navigation, Thumbs, Mousewheel]}
          >
            {slides.map((slide, index) => {
              return (
                <SwiperSlide key={index}>
                  <div className="slider__image">
                    <Image
                      alt={slide.publicId}
                      cloudName={import.meta.env.VITE_CLOUD_NAME}
                      publicId={slide.public_id}
                    />
                  </div>
                </SwiperSlide>
              )
            })}
          </Swiper>
        </div>
      </div>
    </section>
  )
}
