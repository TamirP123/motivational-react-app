import React from 'react';

const DailyMotivation = () => {
  return (
    <div className="section fade-in">
      <h2 className="section-title">Daily Motivation</h2>
      <div className="row">
        <div className="col-md-7">
          <div className="motivation-quote">
            <p>"See you are what you are in this world. That's either one of two things, either you're somebody or you're nobody."</p>
            <p className="quote-author">- Denzel Washington</p>
          </div>
        </div>
        <div className="col-md-5">
          <div className="video-wrapper">
            <iframe src="https://www.youtube.com/embed/ZC4eWrzxIqw?si=-t8xZh_WT_UZtnyL" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyMotivation;