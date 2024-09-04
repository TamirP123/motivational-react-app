import React from 'react';

const AchieveGoals = ({ typedText }) => {
  const goals = [
    { title: "Set Clear Goals", content: "Clearly defined goals give you a roadmap for your journey." },
    { title: "Find Your 'Why'", content: "Understanding the deeper reasons behind your goals adds purpose to your efforts." },
    { title: "Establish a Routine", content: "A structured consistent routine helps you create habits." },
    { title: "Seek Inspiration", content: "Surround yourself with inspiring stories and role models." },
    { title: "Embrace Challenges", content: "View obstacles as opportunities for growth and learning." },
    { title: "Celebrate Progress", content: "Acknowledge your achievements, no matter how small, to stay motivated." }
  ];

  return (
    <div className="section fade-in">
      <h2 className="section-title">Achieve Your Goals</h2>
      <div className="row goals-section">
        <div className="col-md-6">
          <div className="goals-grid">
            {goals.map((goal, index) => (
              <div key={goal.title} className="goal-item slide-in-left" style={{animationDelay: `${index * 0.2}s`}}>
                <h5>{goal.title}</h5>
                <p>{goal.content}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="col-md-6 slide-in-right">
          <div className="goals-image-wrapper">
            <img src="https://img.freepik.com/free-photo/grayscale-vertical-shot-tiny-rough-sea-waves_181624-1521.jpg?uid=R160620524&ga=GA1.1.1261594997.1724037380&semt=ais_hybrid" alt="Achieve your goals" className="goals-image" />
            <div className="typing-overlay">
              <p className="typing-text">{typedText}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AchieveGoals;