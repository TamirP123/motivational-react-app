import React, { useEffect } from 'react';
import { FaRocket, FaUsers, FaTrophy, FaLightbulb, FaChartLine, FaShieldAlt, FaGlobe } from 'react-icons/fa';
import '../styles/AboutPage.css';

const AboutPage = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="about-container">
      <section className="stay-motivated-hero">
        <div className="hero-content">
          <h1>Stay Motivated</h1>
          <p>Unlock your true potential and achieve greatness</p>
          <div className="motivation-cards">
            <div className="motivation-card">
              <h3>Daily Inspiration</h3>
              <p>Start your day with powerful quotes and affirmations</p>
            </div>
            <div className="motivation-card">
              <h3>Goal Tracking</h3>
              <p>Set, visualize, and achieve your personal and professional goals</p>
            </div>
            <div className="motivation-card">
              <h3>Success Stories</h3>
              <p>Get inspired by real-life stories of triumph and perseverance</p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-section mission">
        <div className="section-content">
          <h2>Our Mission</h2>
          <p>At Stay Motivated, we're dedicated to fostering a community where individuals inspire, support, and empower each other. Our mission is to provide the tools, resources, and connections you need to stay motivated and reach new heights in your personal and professional life.</p>
        </div>
      </section>
      
      <section className="about-section features">
        <div className="section-content">
          <h2>Why Join Us?</h2>
          <div className="features-grid">
            <div className="feature-item">
              <FaRocket className="feature-icon" />
              <h3>Exclusive Content</h3>
              <p>Access motivational resources tailored to your growth journey</p>
            </div>
            <div className="feature-item">
              <FaUsers className="feature-icon" />
              <h3>Community</h3>
              <p>Connect with like-minded individuals who support your goals</p>
            </div>
            <div className="feature-item">
              <FaTrophy className="feature-icon" />
              <h3>Challenges</h3>
              <p>Participate in inspiring challenges to push your boundaries</p>
            </div>
            <div className="feature-item">
              <FaLightbulb className="feature-icon" />
              <h3>Share Your Story</h3>
              <p>Inspire others by sharing your own success stories</p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="about-section why-stay-motivated">
        <div className="section-content">
          <h2>Why Stay Motivated?</h2>
          <div className="why-stay-motivated-grid">
            <div className="why-stay-motivated-item">
              <FaChartLine className="why-stay-motivated-icon" />
              <h3>Proven Results</h3>
              <p>Our members report significant improvements in productivity, goal achievement, and overall life satisfaction.</p>
            </div>
            <div className="why-stay-motivated-item">
              <FaShieldAlt className="why-stay-motivated-icon" />
              <h3>Safe and Supportive Environment</h3>
              <p>Experience a judgment-free zone where you can freely express yourself and grow at your own pace.</p>
            </div>
            <div className="why-stay-motivated-item">
              <FaGlobe className="why-stay-motivated-icon" />
              <h3>Global Network</h3>
              <p>Connect with a diverse community of motivated individuals from around the world, expanding your perspectives and opportunities.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
