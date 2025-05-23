import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./styles/CitCarousel.css";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";


const CitCarousel = () => {
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    async function fetchQuotes() {
      try {
        const res = await fetch("http://localhost:3001/quotes");
        const data = await res.json();

        const fullQuotes = await Promise.all(
          data.map(async (q) => {
            const resQuote = await fetch(`http://localhost:3001/quotes/${q.id}`);
            const quoteData = await resQuote.json();
            return quoteData.quote;
          })
        );

        setQuotes(fullQuotes);
      } catch (err) {
        console.error("Errore nel fetch:", err);
      }
    }

    fetchQuotes();
  }, []);

  if (quotes.length === 0) {
    return (
      <div className="py-10">
        <h3 className='text-center text-gray-500'>Nessuna citazione disponibile.</h3>
      </div>
    );
  }

  return (
    <div className="w-full relative">
      <Carousel
        showArrows={true}
        autoPlay
        infiniteLoop
        interval={5000}
        showThumbs={false}
        showStatus={false}
        swipeable
        emulateTouch
        dynamicHeight={false}
        showIndicators={true}
        renderArrowPrev={(onClickHandler, hasPrev, label) =>
          hasPrev && (
            <button
              type="button"
              onClick={onClickHandler}
              title={label}
              className="custom-arrow custom-arrow-left"
            >
              <HiOutlineChevronLeft size={30} />
            </button>
          )
        }
        renderArrowNext={(onClickHandler, hasNext, label) =>
          hasNext && (
            <button
              type="button"
              onClick={onClickHandler}
              title={label}
              className="custom-arrow custom-arrow-right"
            >
              <HiOutlineChevronRight size={30} />
            </button>
          )
        }
      >
        {quotes.map((quote, index) => (
          <div
            key={index}
            className="bg-[#292929] border-4 border-[#568a99] rounded-xl p-6 shadow-lg mb-10 mx-auto max-w-4xl"
            style={{ minHeight: "180px" }}
          >
            <div className="text-xl italic font-semibold mb-4  text-[#f9f6f2]">
              “{quote.title}”
              <p className="text-sm font-medium font-serif  text-[#f9f6f2] mt-2">
                {quote.author}
              </p>
            </div>
            <p className="text-sm font-medium text-[#f9f6f2] italic">
              {quote.song}
            </p>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default CitCarousel;




