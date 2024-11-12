import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const Section = () => {
  const slides = [
    {
      id: 1,
      imageUrl: "/images/banner.jpg",
      heading: "Best Jewel Collection",
      // content: "Slide 1 Content",
    },
    {
      id: 2,
      imageUrl: "/images/banner1.jpg",
      heading: "Slide 2 Heading",
      content: "Slide 2 Content",
    },
    {
      id: 3,
      imageUrl: "/images/banner2.jpeg",
      heading: "Slide 3 Heading",
      content: "Slide 3 Content",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide(currentSlide === slides.length - 1 ? 0 : currentSlide + 1);
  };

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3500);

    return () => clearInterval(interval);
  }, [currentSlide]);

  return (
    <section className="slider_section position-relative">
      <div className="slider_bg_box">
        <img src={slides[currentSlide].imageUrl} alt="" />
        <div className="button-container">
        <FontAwesomeIcon icon={faChevronLeft} className="icon" onClick={prevSlide} />
          <FontAwesomeIcon icon={faChevronRight} className="icon" onClick={nextSlide} />
      </div>
      </div>
      <div className="slider_bg"></div>
      <div className="container">
        <div className="col-md-9 col-lg-8">
          <div className="detail-box">
            <div>
              <div>
                <h1>{slides[currentSlide].heading}</h1>
              </div>
              <div>
                <p>{slides[currentSlide].content}</p>
              </div>
              <div>
                <a href="#" className="slider-link">
                  Shop Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section;
