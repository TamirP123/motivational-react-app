import React, { useState, useEffect } from 'react';
import '../styles/TestimonialSection.css';

const TestimonialSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "John Doe",
      role: "Entrepreneur",
      quote: "This platform has been a game-changer for my personal growth. The daily motivations keep me focused and driven.",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg"
    },
    {
      id: 2,
      name: "Jane Smith",
      role: "Life Coach",
      quote: "I've recommended this to all my clients. The resources here are invaluable for anyone looking to improve themselves.",
      avatar: "https://randomuser.me/api/portraits/women/2.jpg"
    },
    {
      id: 3,
      name: "Mike Johnson",
      role: "Student",
      quote: "As a student, I've found the discipline category particularly helpful. It's helped me stay on track with my studies.",
      avatar: "https://randomuser.me/api/portraits/men/3.jpg"
    }
  ];

  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="testimonial-section">
      <h2 className="section-title">What Our Users Say</h2>
      <div className="testimonial-container">
        {testimonials.map((testimonial, index) => (
          <div
            key={testimonial.id}
            className={`testimonial ${index === currentTestimonial ? 'active' : ''}`}
          >
            <div className="testimonial-content">
              <img src={testimonial.avatar} alt={testimonial.name} className="avatar" />
              <p className="quote">"{testimonial.quote}"</p>
              <p className="name">{testimonial.name}</p>
              <p className="role">{testimonial.role}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="testimonial-dots">
        {testimonials.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentTestimonial ? 'active' : ''}`}
            onClick={() => setCurrentTestimonial(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default TestimonialSection;
