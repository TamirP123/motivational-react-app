import {Carousel, Navbar, Nav} from 'react-bootstrap';
import NavbarComponent from './NavbarComponent';

const CarouselComponent = () => {

	return (
    <div className="carousel-container">
      
      <NavbarComponent/>

      <Carousel>
        <Carousel.Item>
        <div className="overlay"></div>
          <img
            className="d-block w-100"
            src="https://i.pinimg.com/736x/a4/71/9b/a4719b8c3860bec8357dbbc461c2f8fd.jpg"
            alt="First slide"
          />
          <Carousel.Caption>
          <h2 class="bg-dark bg-opacity-50 py-2 px-4">The difference between successful people and unsuccessful people is the willingness to do what others won’t.</h2>
        <a href="#" class="btn btn-outline-light px-4 py-2 rounded-0">Learn More</a>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
        <div className="overlay"></div>
          <img
            className="d-block w-100"
            src="https://images7.alphacoders.com/991/991963.jpg"
            alt="Second slide"
          />
          <Carousel.Caption>
          <h2 class="bg-dark bg-opacity-50 py-2 px-4">You’ve been given another day of life. How will you use it? Will you wait until tomorrow as you’ve done for years or decide today is the day you commit to excellence?</h2>
        <a href="#" class="btn btn-outline-light px-4 py-2 rounded-0">Learn More</a>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
        <div className="overlay"></div>
          <img
            className="d-block w-100"
            src="https://64.media.tumblr.com/7270bde63b1c2725873e536389f04602/tumblr_pxgnr9MDR81y6n681o1_500.jpg"
            alt="Third slide"
          />
          <Carousel.Caption>
          <h2 class="bg-dark bg-opacity-50 py-2 px-4">Adversity builds character.</h2>
        <p class="bg-dark bg-opacity-50 py-2 px-4">It is your duty to challenge yourself and craft your own world.</p>
        <a href="#" class="btn btn-outline-light px-4 py-2 rounded-0">Learn More</a>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default CarouselComponent;
