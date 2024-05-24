import CarouselComponent from "../components/CarouselComponent";
import Footer from "../components/FooterComponent";

const HomePage = () => {
  return (
    <div>
      <CarouselComponent />
      <div className="container">
        <div className="row imageRow justify-content-center mb-5 mt-5 mx-5 px-5">
          <div className="col-3">
            <div className="image-wrapper">
              <button className="image-button">
                <img
                  src="https://t3.ftcdn.net/jpg/04/31/55/92/360_F_431559277_rkkDdPgYlypnPwf4EoDIlvkVDiWNBBft.jpg"
                  alt="Image 1"
                  className="img-fluid"
                />
                <div className="overlay">
                  <div className="overlay-text">Discipline</div>
                </div>
              </button>
            </div>
          </div>
          <div className="col-3">
            <div className="image-wrapper">
              <button className="image-button">
                <img
                  src="https://i.pinimg.com/736x/98/20/ac/9820ac7eac025766a24d7d767dd3c19a.jpg"
                  alt="Image 2"
                  className="img-fluid"
                />
                <div className="overlay">
                  <div className="overlay-text">Faith</div>
                </div>
              </button>
            </div>
          </div>
          <div className="col-3">
            <div className="image-wrapper">
              <button className="image-button">
                <img
                  src="https://miro.medium.com/v2/resize:fit:700/1*yyYSGcw1-HxOlnL8TSwVvQ.jpeg"
                  alt="Image 3"
                  className="img-fluid"
                />
                <div className="overlay">
                  <div className="overlay-text">Growth</div>
                </div>
              </button>
            </div>
          </div>
          <div className="col-3">
            <div className="image-wrapper">
              <button className="image-button">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGMGcoXZbovpV0DFiwAO7ZbkKQE9faMp3GJkrvxmFewDUHKB8cjcY-mBDf6QSzzTvFaeo&usqp=CAU"
                  alt="Image 4"
                  className="img-fluid"
                />
                <div className="overlay">
                  <div className="overlay-text">Confidence</div>
                </div>
              </button>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-center align-items-center">
          <div className="text-center text-white visionContent col-8">
            <h2 className="mt-3 mb-3">Our Values</h2>
            <p>
              <strong>VISION:</strong> Our vision is not only to uplift each
              other and encourage success among each other, but to share our
              success stories and reach new goals in life.
            </p>
          </div>
        </div>

        <div className="col-12 visionCard text-center mt-2 mb-3">
          <div className="row mt-3">
            <div className="text-light col-6">
              <div className="row mt-3">
                <div className="text-light col-5 mx-4">
                  <h5 className="">Set Clear and Achievable Goals</h5>
                  <p className="text-secondary">
                    Clearly defined goals will give you a roadmap for your
                    journey—helping you stay focused and motivated. Break down
                    your larger objectives into smaller, manageable tasks.
                  </p>
                </div>

                <div className="text-light col-5 mx-4">
                  <h5 className="">Find Your "Why"</h5>
                  <p className="text-secondary">
                    Understanding the deeper reasons behind your goals adds
                    purpose to your efforts. Connecting with your "why"
                    strengthens your commitment—making it easier to overcome
                    challenges and setbacks.
                  </p>
                </div>
                <div className="text-light col-5 mx-4">
                  <h5 className="">Establish a Routine</h5>
                  <p className="text-secondary">
                    Establish a daily routine that includes tasks aligned with
                    your goals. A structured consistent routine will help you
                    create habits—making it easier to stay on track even when
                    you find yourself faced with unimportant distractions.
                  </p>
                </div>
                <div className="text-light col-6">
                  <h5 className="">Seek Inspiration from Others</h5>
                  <p className="text-secondary">
                    Surround yourself with inspiring stories and role models.
                    Learn from the experiences of others who have overcome
                    challenges and achieved success. Their stories will be a
                    source of motivation—giving you insights that resonate with
                    your own journey.
                  </p>
                </div>
              </div>
            </div>

            <div className="text-light col-6">
              <div className="goalsWrapper">
                <img src="https://5.imimg.com/data5/QG/OP/MY-78279083/ocean-wallpaper-500x500.jpg" alt="Goals"></img>

                <div className="goalsOverlay">
                  <div className="overlay-text">Achieve your goals</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
