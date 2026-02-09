import {ChevronLeft, ChevronRight} from "lucide-react";
import React, {useRef, useState} from "react";
import "./Slider.css";
import Star from "../../Assets/star3.png";
import slider1 from "../../Assets/slider1.jpg";
import slider2 from "../../Assets/slider2.jpg";
import slider3 from "../../Assets/slider3.jpg";
import slider4 from "../../Assets/slider4.jpg";
import slider5 from "../../Assets/slider5.jpg";
import slider6 from "../../Assets/slider6.jpg";
function Slider() {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const scrollContainerRef = useRef();
  const services = [
    {
      id: 1,
      title: "Cleaning Service",
      image: slider2,
      color: "#A11000",
    },
    {
      id: 2,
      title: "Cleaning Service",
      image: slider1,
      color: "#0182FC",
    },
    {
      id: 3,
      title: "Home Service",
      image: slider3,
      color: "#DF4F02",
    },
    {
      id: 4,
      title: "Bathroom Service",

      image: slider4,
      color: "#D9AD00",
    },
    {
      id: 5,
      title: "Home Service",
      image: slider5,
      color: "#3800D2",
    },
    {
      id: 6,
      title: "Garden Service",
      image: slider6,
      color: "#0096CD",
    },
  ];

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - (scrollContainerRef.current?.offsetLeft || 0));
    setScrollLeft(scrollContainerRef.current?.scrollLeft || 0);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (scrollContainerRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2;
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };
  return (
    <div>
      {" "}
      <section className="slider-section">
        <div className="container">
          <div className="slider-header">
            {" "}
            <div className="d-flex">
              <img
                src={Star}
                alt="Skilled repair expert"
                className="badge-icon-star"
              />

              <div className="slider-header-top">
                <button className="service-badge">Our Service</button>
              </div>
            </div>
            <div className="slider-title-row">
              <h2 className="slider-title">Home care essentials</h2>
              <p className="slider-description">
                Explore Space home care essentials - expert cleaning, plumbing,
                AC maintenance, painting, and more, fast, reliable, tailored to
                your needs.
              </p>
            </div>
          </div>

          <div className="slider-wrapper">
            {/* <button
              className="slider-arrow slider-arrow-left"
              onClick={() => scroll("left")}
              aria-label="Previous"
            >
              <ChevronLeft />
            </button> */}

            <div
              className="slider-container"
              ref={scrollContainerRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              {services.map((service) => (
                <div key={service.id} className="slider-card">
                  <div
                    className="slider-card-header"
                    style={{backgroundColor: service.color}}
                  >
                    <span className="slider-card-title">{service.title}</span>
                  </div>
                  <div className="slider-card-image">
                    <img
                      style={{border: `10px solid ${service.color}`}}
                      src={service.image}
                      alt={service.title}
                      draggable="false"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* <button
              className="slider-arrow slider-arrow-right"
              onClick={() => scroll("right")}
              aria-label="Next"
            >
              <ChevronRight />
            </button> */}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Slider;
