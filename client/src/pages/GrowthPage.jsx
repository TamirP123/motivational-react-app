import React, { useState, useEffect, useRef } from "react";
import '../styles/GrowthPage.css';
import { FaBrain, FaChartLine, FaLightbulb } from 'react-icons/fa';

const GrowthPage = () => {
  const [animatedElements, setAnimatedElements] = useState([]);
  const observerRef = useRef(null);

  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);

  const quizQuestions = [
    {
      question: "I believe my abilities can be developed through hard work and dedication.",
      options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]
    },
    {
      question: "I see challenges as opportunities to learn and grow.",
      options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]
    },
    {
      question: "I embrace feedback as a chance to improve myself.",
      options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]
    }
  ];

  const handleQuizStart = () => {
    setQuizStarted(true);
  };

  const handleAnswer = (index) => {
    setScore(score + (4 - index));
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizStarted(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observerCallback = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const elements = document.querySelectorAll('.growth-page .growth-section, .growth-page .growth-card, .growth-page .growth-feature, .growth-page .success-story');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    animatedElements.forEach((el) => {
      el.classList.add('animate');
    });
  }, [animatedElements]);

  const successStories = [
    {
      name: "Alex Thompson",
      story: "Through consistent effort and self-reflection, I transformed my career and doubled my income in just two years.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
    },
    {
      name: "Emily Rodriguez",
      story: "By embracing a growth mindset, I overcame my fears and started my own successful business.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    },
    {
      name: "David Lee",
      story: "Personal development helped me improve my relationships and find true happiness in my life.",
      image: "https://randomuser.me/api/portraits/men/32.jpg"
    }
  ];

  return (
    <div className="growth-page">
      <div className="growth-hero">
        <div className="growth-hero-content">
          <h1 className="growth-hero-title">Unlock Your Potential</h1>
          <p className="growth-hero-text">Embark on a transformative journey of self-discovery and personal development.</p>
        </div>
      </div>
      
      <div className="growth-content-wrapper">
        <section className="growth-section">
          <h2 className="growth-section-title">Daily Inspiration</h2>
          <p className="growth-quote">"The only way to do great work is to love what you do." <span className="growth-quote-author">- Steve Jobs</span></p>
        </section>
        
        <main className="growth-content">
          <div className="growth-card">
            <h2 className="growth-card-title">Mindset Mastery</h2>
            <p className="growth-card-content">Develop a growth mindset and overcome limiting beliefs to achieve your full potential.</p>
          </div>
          <div className="growth-card">
            <h2 className="growth-card-title">Goal Setting</h2>
            <p className="growth-card-content">Learn effective techniques to set and achieve meaningful personal and professional goals.</p>
          </div>
          <div className="growth-card">
            <h2 className="growth-card-title">Habit Formation</h2>
            <p className="growth-card-content">Build positive habits and break negative ones to create lasting change in your life.</p>
          </div>
          <div className="growth-card">
            <h2 className="growth-card-title">Emotional Intelligence</h2>
            <p className="growth-card-content">Enhance your self-awareness and improve your relationships through emotional intelligence.</p>
          </div>
          <div className="growth-card">
            <h2 className="growth-card-title">Time Management</h2>
            <p className="growth-card-content">Master productivity techniques to make the most of your time and achieve work-life balance.</p>
          </div>
          <div className="growth-card">
            <h2 className="growth-card-title">Personal Finance</h2>
            <p className="growth-card-content">Learn essential financial skills to secure your future and achieve financial freedom.</p>
          </div>
        </main>
        
        <section className="growth-section quiz-section">
          <h2 className="growth-section-title">Growth Mindset Quiz</h2>
          {!quizStarted ? (
            score === 0 ? (
              <div className="quiz-intro">
                <p>Test your growth mindset with this quick quiz!</p>
                <button className="quiz-start-btn" onClick={handleQuizStart}>Start Quiz</button>
              </div>
            ) : (
              <div className="quiz-result">
                <p>Your growth mindset score: {score} out of {quizQuestions.length * 4}</p>
                <p>{score > (quizQuestions.length * 2) ? "Great job! You have a strong growth mindset." : "There's room for improvement in your growth mindset."}</p>
                <button className="quiz-start-btn" onClick={() => {setScore(0); setCurrentQuestion(0);}}>Retake Quiz</button>
              </div>
            )
          ) : (
            <div className="quiz-question">
              <p>{quizQuestions[currentQuestion].question}</p>
              {quizQuestions[currentQuestion].options.map((option, index) => (
                <button key={index} className="quiz-option" onClick={() => handleAnswer(index)}>{option}</button>
              ))}
            </div>
          )}
        </section>

        <section className="growth-section join-community">
          <h2 className="growth-section-title">Accelerate Your Growth</h2>
          <p className="growth-subtitle">Access powerful tools and connect with like-minded individuals on your journey to success.</p>
          <div className="growth-features">
            <div className="growth-feature">
              <FaBrain className="growth-feature-icon" />
              <h3 className="growth-feature-title">Personalized Learning</h3>
              <p className="growth-feature-description">Tailored courses and resources to match your unique growth path.</p>
            </div>
            <div className="growth-feature">
              <FaChartLine className="growth-feature-icon" />
              <h3 className="growth-feature-title">Progress Tracking</h3>
              <p className="growth-feature-description">Monitor your growth with interactive tools and insightful analytics.</p>
            </div>
            <div className="growth-feature">
              <FaLightbulb className="growth-feature-icon" />
              <h3 className="growth-feature-title">Expert Mentorship</h3>
              <p className="growth-feature-description">Connect with industry leaders for guidance and inspiration.</p>
            </div>
          </div>
          <div className="success-stories">
            <h3 className="success-stories-title">Inspiring Success Stories</h3>
            <div className="success-stories-grid">
              {successStories.map((story, index) => (
                <div key={index} className="success-story">
                  <img src={story.image} alt={story.name} className="success-image" />
                  <div className="success-content">
                    <p className="success-quote">{story.story}</p>
                    <p className="success-name">- {story.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default GrowthPage;
