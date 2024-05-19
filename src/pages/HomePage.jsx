import CarouselComponent from "../components/CarouselComponent";

const HomePage = () => {

	return (
		<>
		<CarouselComponent/>
		<div className="container justify-content-center">
      <div className="row imageRow justify-content-center mb-5 mt-5 mx-5 px-5">
        <div className="col-3">
          <div className="image-wrapper">
            <img
              src="https://t3.ftcdn.net/jpg/04/31/55/92/360_F_431559277_rkkDdPgYlypnPwf4EoDIlvkVDiWNBBft.jpg"
              alt="Image 1"
              className="img-fluid"
            />
            <div className="overlay">
              <div className="overlay-text">Discipline</div>
            </div>
          </div>
        </div>
        <div className="col-3">
          <div className="image-wrapper">
            <img
              src="https://i.pinimg.com/736x/98/20/ac/9820ac7eac025766a24d7d767dd3c19a.jpg"
              alt="Image 2"
              className="img-fluid"
            />
            <div className="overlay">
              <div className="overlay-text">Faith</div>
            </div>
          </div>
        </div>
        <div className="col-3">
          <div className="image-wrapper">
            <img
              src="https://miro.medium.com/v2/resize:fit:700/1*yyYSGcw1-HxOlnL8TSwVvQ.jpeg"
              alt="Image 3"
              className="img-fluid"
            />
            <div className="overlay">
              <div className="overlay-text">Growth</div>
            </div>
          </div>
        </div>
        <div className="col-3">
          <div className="image-wrapper">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGMGcoXZbovpV0DFiwAO7ZbkKQE9faMp3GJkrvxmFewDUHKB8cjcY-mBDf6QSzzTvFaeo&usqp=CAU"
              alt="Image 4"
              className="img-fluid"
            />
            <div className="overlay">
              <div className="overlay-text">Confidence</div>
            </div>
          </div>
        </div>
      </div>
    </div>
	</>
	);
};

export default HomePage;
