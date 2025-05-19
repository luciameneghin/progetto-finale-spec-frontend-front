import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from "react-responsive-carousel"

const images = [
  {
    src: "http://localhost:3001/images/carousel/'70s-radio.jpg",
    alt: "radio",
  },
  {
    src: "http://localhost:3001/images/carousel/'70s-instrument.jpg",
    alt: "instruments",
  },
  {
    src: "http://localhost:3001/images/carousel/'70s-bass.jpg",
    alt: "bass",
  },
  {
    src: "http://localhost:3001/images/carousel/'70s-band.jpg",
    alt: "band",
  },
  {
    src: "http://localhost:3001/images/carousel/'70s-records.jpg",
    alt: "records",
  },
  {
    src: "http://localhost:3001/images/carousel/'70s-vin.jpg",
    alt: "vinyl",
  },
  {
    src: "http://localhost:3001/images/carousel/'70s-vinyl.jpg",
    alt: "vinyls",
  },
  {
    src: "http://localhost:3001/images/carousel/'70s-disc.jpg",
    alt: "disc",
  }
]

const AlbumCarousel = () => {
  return (
    <div className="w-full max-w-screen overflow-hidden">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        interval={4000}
        transitionTime={800}
      >
        {images.map((img, index) => (
          <div key={index}>
            <img
              src={img.src}
              alt={img.alt}
              className="object-cover w-full max-h-[600px]"
            />
          </div>
        ))}
      </Carousel>
    </div>
  )
}

export default AlbumCarousel
