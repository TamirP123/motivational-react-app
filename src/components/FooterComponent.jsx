import React from 'react';

const FooterComponent = () => {
  return (
    <div>
    <div className="goalsWrapper w-100 mt-5">
    <img 
        src="https://imageio.forbes.com/specials-images/imageserve/1093954408/Two-rich-couples-putting-their-glasses-together-in-a-celebratory-toast-while/960x0.jpg?format=jpg&width=960" 
        alt="Above Footer" 
        className="footer-img" 
      />
                <div className="goalsOverlay">
                  <div className="overlay-text-footer">
                    <h1>Want to become a member?</h1>
                    <p>
                    Creating an account with us allows you to join our community, which includes<br/>
                    viewing and sharing success stories, communicating with other uplifting<br/>
                    members, and getting daily motivating newsletters!
                  </p>
                  <button className='button'>
              Sign up
            </button>
                    </div>
                </div>
              </div>
    <footer className="text-white text-center py-4">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <p>&copy; Stay Motivated. All Rights Reserved.</p>
            <p>
              <a href="#privacy" className="text-white">Privacy Policy</a> | <a href="#terms" className="text-white">Terms of Service</a>
            </p>
            
          </div>
        </div>
      </div>
    </footer>
  </div>
  );
};

export default FooterComponent;