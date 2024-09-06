import React, { useState, useEffect } from 'react';
import '../styles/ConfidencePage.css';

const ConfidencePage = () => {

    useEffect(() => {
        // Scroll to the top of the page when the component mounts
        window.scrollTo(0, 0);
      }, []);

  const [affirmation, setAffirmation] = useState('');
  const [showAffirmation, setShowAffirmation] = useState(false);
  const [challengeCompleted, setChallengeCompleted] = useState(false);

  const generateAffirmation = () => {
    const affirmations = [
      "I am capable of achieving great things.",
      "I believe in myself and my abilities.",
      "I am worthy of success and happiness.",
      "I embrace challenges as opportunities for growth.",
      "I am confident in my decisions and actions.",
      "I radiate confidence, self-respect, and inner harmony.",
      "I trust in my own wisdom and intuition.",
      "I am deserving of love, respect, and success.",
      "I have the power to create positive change in my life.",
      "I am resilient and can overcome any obstacle."
    ];
    const randomAffirmation = affirmations[Math.floor(Math.random() * affirmations.length)];
    setAffirmation(randomAffirmation);
    setShowAffirmation(true);
  };

  const completeChallenge = () => {
    setChallengeCompleted(true);
    setTimeout(() => setChallengeCompleted(false), 3000);
  };

  return (
    <div className="confidence-page">
      <div className="confidence-hero">
        <div className="confidence-hero-content">
          <h1 className="confidence-hero-title">Unlock Your Potential</h1>
          <p className="confidence-hero-text">Confidence is the key to success. Let's build it together.</p>
        </div>
      </div>
      
      <section className="content">
        <h2>Embrace Your Inner Strength</h2>
        <p className="intro">Confidence isn't about being perfect; it's about believing in yourself and your abilities. It's the foundation for personal growth and success in all areas of life.</p>
        
        <div className="confidence-tips">
          <div className="tip">
            <h3>Set Small Goals</h3>
            <p>Start with achievable targets and build momentum. Each small win boosts your confidence and motivates you to tackle bigger challenges.</p>
          </div>
          <div className="tip">
            <h3>Practice Self-Compassion</h3>
            <p>Be kind to yourself, especially when facing challenges. Treat yourself with the same kindness you'd offer a good friend.</p>
          </div>
          <div className="tip">
            <h3>Celebrate Your Wins</h3>
            <p>Acknowledge your progress, no matter how small. Recognizing your achievements reinforces positive behavior and builds self-esteem.</p>
          </div>
        </div>

        <div className="confidence-booster">
          <h3>Confidence Booster</h3>
          <p>Need a quick confidence boost? Generate a positive affirmation to inspire and motivate you!</p>
          <button className="generate-btn" onClick={generateAffirmation}>Generate Affirmation</button>
          {showAffirmation && (
            <div className="affirmation-display">
              <p>{affirmation}</p>
            </div>
          )}
        </div>

        <div className="quote confidence-quote">
          <blockquote>"With realization of one's own potential and self-confidence in one's ability, one can build a better world."</blockquote>
          <cite>- Dalai Lama</cite>
        </div>

        <div className="confidence-challenge">
          <h3>7-Day Confidence Challenge</h3>
          <p>Boost your confidence with daily actions. Complete today's challenge:</p>
          <div className="challenge-task">
            <h4>Today's Task: Power Pose for 2 Minutes</h4>
            <p>Stand tall with your hands on your hips, chin up, and chest out. Hold this pose for 2 minutes to instantly boost your confidence.</p>
            <button className="challenge-btn" onClick={completeChallenge}>
              {challengeCompleted ? "Great job!" : "Mark as Completed"}
            </button>
          </div>
          {challengeCompleted && (
            <div className="challenge-completed">
              <p>Challenge completed! Keep up the great work!</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ConfidencePage;
