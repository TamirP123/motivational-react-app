import React from 'react';

const MotivationalCategories = () => {
  const categories = [
    {
      category: 'Discipline',
      src: "https://t3.ftcdn.net/jpg/04/31/55/92/360_F_431559277_rkkDdPgYlypnPwf4EoDIlvkVDiWNBBft.jpg"
    },
    {
      category: 'Faith',
      src: "https://i.pinimg.com/736x/98/20/ac/9820ac7eac025766a24d7d767dd3c19a.jpg"
    },
    {
      category: 'Growth',
      src: "https://miro.medium.com/v2/resize:fit:700/1*yyYSGcw1-HxOlnL8TSwVvQ.jpeg"
    },
    {
      category: 'Confidence',
      src: "https://4kwallpapers.com/images/walls/thumbs_2t/13647.jpg"
    }
  ];

  return (
    <div className="section fade-in">
      <h2 className="section-title">Motivational Categories</h2>
      <div className="image-row">
        {categories.map((item, index) => (
          <div key={item.category} className={`image-wrapper slide-in-${index % 2 === 0 ? 'left' : 'right'} ${item.category.toLowerCase()}-image`} style={{animationDelay: `${index * 0.2}s`}}>
            <button className="image-button">
              <img
                src={item.src}
                alt={item.category}
                className="img-fluid"
              />
              <div className="overlay">
                <div className="overlay-text">{item.category}</div>
              </div>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MotivationalCategories;