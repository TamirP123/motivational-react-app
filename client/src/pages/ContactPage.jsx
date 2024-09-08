import React, { useState, useEffect } from 'react';
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';
import '../styles/ContactPage.css';

const ContactPage = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // Reset form after submission
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="contact-container">
      <h1 className="contact-title">Get in Touch</h1>
      <div className="contact-content">
        <div className="contact-info">
          <h2>We'd Love to Hear From You</h2>
          <p>Have questions about our community or membership? Reach out to us!</p>
          <div className="contact-details">
            <div className="contact-item">
              <MdEmail className="contact-icon" />
              <span>info@elevate.com</span>
            </div>
            <div className="contact-item">
              <MdPhone className="contact-icon" />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="contact-item">
              <MdLocationOn className="contact-icon" />
              <span>123 Inspiration Ave, Motivate City, MC 12345</span>
            </div>
          </div>
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <button type="submit" className="submit-button">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
