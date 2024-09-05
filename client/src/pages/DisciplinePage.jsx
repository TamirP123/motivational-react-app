import React, { useState, useEffect, useRef } from "react";
import "../styles/DisciplinePage.css";

const DisciplinePage = () => {
  const [quote, setQuote] = useState("");

  const andrewTateQuotes = [
    "Discipline is the most important thing in the world.",
    "The difference between who you are and who you want to be is what you do.",
    "You have to be obsessed. You have to be willing to work harder than anyone else.",
    "The only way to get out of mediocrity is through discipline and hard work.",
    "Discipline is choosing between what you want now and what you want most.",
    "Success isn't owned, it's leased. And rent is due every day.",
    "The pain of discipline is far less than the pain of regret.",
    "Your mind must be stronger than your feelings.",
    "Comfort is the enemy of achievement.",
    "Discipline is doing what needs to be done, even when you don't want to do it.",
  ];

  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * andrewTateQuotes.length);
    setQuote(andrewTateQuotes[randomIndex]);
  }, []);

  const disciplineTips = [
    "Set clear goals and create a plan",
    "Develop a consistent daily routine",
    "Practice time management",
    "Eliminate distractions",
    "Embrace discomfort and push limits",
    "Hold yourself accountable",
    "Cultivate self-control",
  ];

  const animatedSections = useRef([]);
  const tipItems = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    }, { threshold: 0.1 });

    animatedSections.current.forEach(section => observer.observe(section));
    tipItems.current.forEach(item => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="discipline-page">
      <section className="hero">
        <img
          src="https://img.freepik.com/free-photo/individual-doing-sport-healthy-lifestyle_23-2151764290.jpg?uid=R160620524&ga=GA1.1.1261594997.1724037380&semt=ais_hybrid"
          alt="Discipline Hero"
          className="hero-image"
        />
        <div className="hero-content">
          <h1>Master the Art of Discipline</h1>
          <p>Unlock your potential and achieve greatness</p>
        </div>
      </section>

      <section className="quote-section">
        <blockquote>
          <p>"{quote}"</p>
          <footer>- Andrew Tate</footer>
        </blockquote>
      </section>

      <section ref={el => animatedSections.current.push(el)} className="content-section fade-in">
        <h2>Why Discipline Matters</h2>
        <p>
          Discipline is the bridge between goals and accomplishment. It's the
          foundation of success in every area of life, from personal growth to
          professional achievements.
        </p>
      </section>

      <section ref={el => animatedSections.current.push(el)} className="tips-section fade-in">
        <h2>7 Tips to Boost Your Discipline</h2>
        <ul className="tips-grid">
          {disciplineTips.map((tip, index) => (
            <li 
              key={index} 
              ref={el => tipItems.current.push(el)} 
              className="tip-item slide-in-right"
              style={{transitionDelay: `${index * 0.1}s`}}
            >
              <span className="tip-number">{index + 1}</span>
              <p>{tip}</p>
            </li>
          ))}
        </ul>
      </section>

      <section ref={el => animatedSections.current.push(el)} className="cta-section fade-in">
        <h2>Ready to Transform Your Life?</h2>
        <p>Start your journey to mastering discipline today!</p>
        <button className="cta-button">Get Started</button>
      </section>

      {/* New section */}
      <section ref={el => animatedSections.current.push(el)} className="consistency-section fade-in">
        <h2>The Power of Consistency</h2>
        <div className="consistency-content">
          <div className="consistency-text">
            <p>
              Consistency is the key to unlocking the full potential of
              discipline. When you consistently apply disciplined habits, you
              create a compound effect that leads to extraordinary results over
              time.
            </p>
            <ul>
              <li>Build unshakeable habits</li>
              <li>Overcome plateaus and setbacks</li>
              <li>Achieve long-term success</li>
              <li>Develop a strong sense of self-trust</li>
            </ul>
          </div>
          <div className="consistency-image">
            <img
              src="https://img.freepik.com/premium-photo/silhouette-woman-lifting-weights-against-yellow-background_412311-6321.jpg?uid=R160620524&ga=GA1.1.1261594997.1724037380&semt=ais_hybrid"
              alt="Consistent discipline"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default DisciplinePage;
