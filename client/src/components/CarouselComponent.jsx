import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import NavbarComponent from './NavbarComponent';
import '../styles/CarouselComponent.css'; // We'll create this file for custom styles

const CarouselComponent = () => {
	const [index, setIndex] = useState(0);

	const handleSelect = (selectedIndex) => {
		setIndex(selectedIndex);
	};

	useEffect(() => {
		const timer = setTimeout(() => {
			setIndex((prevIndex) => (prevIndex + 1) % 3);
		}, 7000);
		return () => clearTimeout(timer);
	}, [index]);

	return (
		<div className="carousel-container">
			<NavbarComponent />
			<Carousel activeIndex={index} onSelect={handleSelect} fade interval={null}>
				<Carousel.Item>
					<div className="carousel-image-container">
						<img
							className="d-block w-100"
							src="https://i.pinimg.com/736x/a4/71/9b/a4719b8c3860bec8357dbbc461c2f8fd.jpg"
							alt="First slide"
						/>
					</div>
					<Carousel.Caption className="custom-caption">
						<h2>The difference between successful people and unsuccessful people is the willingness to do what others won't.</h2>
					</Carousel.Caption>
				</Carousel.Item>
				<Carousel.Item>
					<div className="carousel-image-container">
						<img
							className="d-block w-100"
							src="https://images7.alphacoders.com/991/991963.jpg"
							alt="Second slide"
						/>
					</div>
					<Carousel.Caption className="custom-caption">
						<h2>You've been given another day of life. How will you use it?</h2>
						<p>Will you wait until tomorrow as you've done for years or decide today is the day you commit to excellence?</p>
					</Carousel.Caption>
				</Carousel.Item>
				<Carousel.Item>
					<div className="carousel-image-container">
						<img
							className="d-block w-100"
							src="https://64.media.tumblr.com/7270bde63b1c2725873e536389f04602/tumblr_pxgnr9MDR81y6n681o1_500.jpg"
							alt="Third slide"
						/>
					</div>
					<Carousel.Caption className="custom-caption">
						<h2>Adversity builds character.</h2>
						<p>It is your duty to challenge yourself and craft your own world.</p>
					</Carousel.Caption>
				</Carousel.Item>
			</Carousel>
			<div className="scroll-indicator">
			</div>
		</div>
	);
};

export default CarouselComponent;
