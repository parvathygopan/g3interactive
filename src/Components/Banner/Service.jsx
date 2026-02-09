import "./BannerStyle.css";
import Image1 from "../../Assets/banner1.jpg";
import Image2 from "../../Assets/banner2.jpg";
import Image3 from "../../Assets/banner3.jpg";
function Service() {
  return (
    <section className="services-section">
      <div className="container">
        <div className="row g-4">
          <div className="col-12 col-md-6 col-lg-4 col-sm-12">
            <div className="service-card service-card-large">
              <img
                src={Image2}
                alt="Skilled repair expert"
                className="service-image"
              />
              <div className="service-overlay">
                <h3 className="service-title">Skilled Experts,</h3>
                <h3 className="service-title">Reliable Service</h3>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-6 col-lg-4 col-sm-12">
            <div className="service-card service-card-medium mb-4">
              <img
                 src={Image1}
                alt="Fast booking service"
                className="service-image"
              />
              <div className="service-overlay">
                <h3 className="service-title">Fast Booking</h3>
                <h3 className="service-title">Instant Help</h3>
              </div>
            </div>

            <div className="satisfaction-card">
              <div className="satisfaction-content">
                <div className="avatars-group">
                  <div className="avatar avatar-1">👨</div>
                  <div className="avatar avatar-2">👩</div>
                  <div className="avatar avatar-3">🧔</div>
                </div>
                <div className="satisfaction-text">
                  <div className="satisfaction-percentage">98%</div>
                  <div className="satisfaction-label">Customer Satisfaction</div>
                </div>
              </div>
           
            </div>
          </div>

          <div className="col-12 col-md-6 col-lg-4 col-sm-12">
            <div className="service-card service-card-large">
              <img
                src={Image3}
                alt="Safe on-demand service"
                className="service-image"
              />
              <div className="service-overlay">
                <h3 className="service-title">Safe, Easy,</h3>
                <h3 className="service-title">On-Demand</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Service;

