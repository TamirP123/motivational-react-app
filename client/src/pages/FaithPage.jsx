import React, { useState, useEffect, useRef } from "react";
import '../styles/FaithPage.css';
import { FaUsers, FaPray, FaBook, FaQuoteLeft } from 'react-icons/fa';

const FaithPage = () => {

  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, []);

  const memberStories = [
    {
      name: "Sarah Johnson",
      story: "Through faith, I found strength to overcome addiction and rebuild my life.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    },
    {
      name: "Michael Chen",
      story: "My faith journey helped me find purpose and joy in serving others.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
    },
    {
      name: "Amira Hassan",
      story: "Faith gave me courage to pursue my dreams and make a difference in my community.",
      image: "https://randomuser.me/api/portraits/women/3.jpg"
    }
  ];

  return (
    <div className="faith-page">
      <div className="faith-hero">
        <div className="faith-hero-content">
          <h1 className="faith-hero-title">Strengthen Your Faith</h1>
          <p className="faith-hero-text">Embark on a transformative journey to deepen your spiritual connection and find inner peace.</p>
        </div>
      </div>
      
      <div className="faith-content-wrapper">
        <section className="faith-section">
          <h2 className="faith-section-title">Daily Inspiration</h2>
          <p className="faith-quote">"For I know the plans I have for you," declares the LORD, "plans to prosper you and not to harm you, plans to give you hope and a future." <span className="faith-quote-author">- Jeremiah 29:11</span></p>
        </section>
        
        <main className="faith-content">
          <div className="faith-card">
            <h2 className="faith-card-title">Scripture Study</h2>
            <p className="faith-card-content">Dive deep into the Word with our guided Bible study plans and insightful commentaries.</p>
          </div>
          <div className="faith-card">
            <h2 className="faith-card-title">Community Support</h2>
            <p className="faith-card-content">Connect with others on similar spiritual journeys and share your experiences in our supportive community.</p>
          </div>
          <div className="faith-card">
            <h2 className="faith-card-title">Prayer Resources</h2>
            <p className="faith-card-content">Access guided prayers, meditation tools, and prayer journals to deepen your faith practice.</p>
          </div>
          <div className="faith-card">
            <h2 className="faith-card-title">Faith Challenges</h2>
            <p className="faith-card-content">Participate in weekly challenges designed to strengthen your faith and put your beliefs into action.</p>
          </div>
          <div className="faith-card">
            <h2 className="faith-card-title">Inspirational Stories</h2>
            <p className="faith-card-content">Read uplifting testimonies and stories of faith from people around the world.</p>
          </div>
          <div className="faith-card">
            <h2 className="faith-card-title">Spiritual Growth Tracker</h2>
            <p className="faith-card-content">Monitor your spiritual journey with our interactive tools and set personal faith goals.</p>
          </div>
        </main>
        
        <section className="faith-section join-community">
          <h2 className="faith-section-title">Join Our Community</h2>
          <p className="faith-subtitle">Connect with like-minded individuals and grow together in faith.</p>
          <div className="community-features">
            <div className="community-feature">
              <FaUsers className="community-feature-icon" />
              <h3 className="community-feature-title">Supportive Network</h3>
              <p className="community-feature-description">Connect with believers worldwide and share your faith journey.</p>
            </div>
            <div className="community-feature">
              <FaPray className="community-feature-icon" />
              <h3 className="community-feature-title">Prayer Circles</h3>
              <p className="community-feature-description">Join virtual prayer groups and lift each other up in faith.</p>
            </div>
            <div className="community-feature">
              <FaBook className="community-feature-icon" />
              <h3 className="community-feature-title">Study Groups</h3>
              <p className="community-feature-description">Participate in online Bible studies and deepen your understanding.</p>
            </div>
          </div>
          <div className="member-stories">
            <h3 className="member-stories-title">Inspiring Faith Journeys</h3>
            <div className="member-stories-grid">
              {memberStories.map((member, index) => (
                <div key={index} className="member-story">
                  <img src={member.image} alt={member.name} className="member-image" />
                  <div className="member-content">
                    <FaQuoteLeft className="quote-icon" />
                    <p className="member-quote">{member.story}</p>
                    <p className="member-name">- {member.name}</p>
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

export default FaithPage;
