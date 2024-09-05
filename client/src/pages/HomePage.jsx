import React, { useState, useEffect } from 'react';
import CarouselComponent from "../components/CarouselComponent";
import MotivationalCategories from "../components/MotivationalCategories";
import VisionSection from "../components/VisionSection";
import AchieveGoals from "../components/AchieveGoals";
import DailyMotivation from "../components/DailyMotivation";
import TestimonialSection from "../components/TestimonialSection";
import '../styles/HomePage.css';

const HomePage = () => {
  const [typedText, setTypedText] = useState('');
  const fullText = "Achieve your goals and unlock your full potential.";
  
  useEffect(() => {
    let index = 0;
    let typingInterval;
    let pauseTimeout;

    const startTyping = () => {
      typingInterval = setInterval(() => {
        if (index < fullText.length) {
          setTypedText(fullText.slice(0, index + 1));
          index++;
        } else {
          clearInterval(typingInterval);
          pauseTimeout = setTimeout(() => {
            setTypedText('');
            index = 0;
            startTyping();
          }, 5000); // 5-second pause before restarting
        }
      }, 50);
    };

    startTyping();

    return () => {
      clearInterval(typingInterval);
      clearTimeout(pauseTimeout);
    };
  }, []);

  return (
    <div className="home-page">
      <CarouselComponent />
      <div className="container">
        <MotivationalCategories />
        <VisionSection />
        <AchieveGoals typedText={typedText} />
        <DailyMotivation />
        <TestimonialSection />
      </div>
    </div>
  );
};

export default HomePage;
