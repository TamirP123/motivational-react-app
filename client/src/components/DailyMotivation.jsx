import React, { useState, useEffect } from "react";
import "../styles/DailyMotivation.css";

const DailyMotivation = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className={`daily-motivation-section ${isVisible ? "fade-in" : ""}`}>
      <h2 className="section-title">Daily Motivation</h2>
      <div className="motivation-content">
        <div className="motivation-quote-container">
          <div className="motivation-quote">
            <p>
              "See you are what you are in this world. That's either one of two
              things, either you're somebody or you're nobody."
            </p>
            <p className="quote-author">- Denzel Washington</p>
          </div>
        </div>
        <div className="video-container">
          <div className="video-wrapper">
            <iframe
              src="https://www.youtube.com/embed/ZC4eWrzxIqw?si=-t8xZh_WT_UZtnyL"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyMotivation;
