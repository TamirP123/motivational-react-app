import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
} from "react-icons/fa";

const FooterComponent = () => {
  const linkStyle = {
    color: "#d3d3d3",
    textDecoration: "none",
    transition: "color 0.3s ease",
  };

  const linkHoverStyle = {
    color: "#ff8c00",
  };

  const iconStyle = {
    color: "#808080",
    fontSize: "1.5rem",
    transition: "color 0.3s ease",
  };

  const iconHoverStyle = {
    color: "#ff8c00",
  };

  return (
    <div>
      <div className="membership-cta w-100 position-relative">
        <img
          src="https://imageio.forbes.com/specials-images/imageserve/1093954408/Two-rich-couples-putting-their-glasses-together-in-a-celebratory-toast-while/960x0.jpg?format=jpg&width=960"
          alt="Successful people celebrating"
          className="footer-img w-100"
        />
        <div
          className="cta-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
        >
          <div className="cta-content text-center text-white">
            <h2 className="display-4 mb-4" style={{ color: "#ff8c00" }}>
              Elevate Your Journey
            </h2>
            <p className="lead mb-4">
              Join our exclusive community and unlock a world of opportunities:
            </p>
            <ul className="list-unstyled mb-4">
              <li>✓ Access inspiring success stories</li>
              <li>✓ Connect with like-minded achievers</li>
              <li>✓ Receive daily motivational insights</li>
            </ul>
            <Link
              to="/signup"
              className="btn btn-lg"
              style={{ backgroundColor: "#ff8c00", color: "#1a1a1a" }}
            >
              Become a Member
            </Link>
          </div>
        </div>
      </div>
      <footer
        className="text-white py-5"
        style={{ backgroundColor: "#1a1a1a" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-4 mb-3 mb-md-0">
              <h5 style={{ color: "#ff8c00" }}>Stay Motivated</h5>
              <p className="small">
                Empowering individuals to achieve greatness every day.
              </p>
            </div>
            <div className="col-md-4 mb-3 mb-md-0">
              <h5 style={{ color: "#ff8c00" }}>Quick Links</h5>
              <ul className="list-unstyled">
                <li>
                  <Link
                    to="/about"
                    style={linkStyle}
                    onMouseOver={(e) =>
                      Object.assign(e.target.style, linkHoverStyle)
                    }
                    onMouseOut={(e) => Object.assign(e.target.style, linkStyle)}
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    style={linkStyle}
                    onMouseOver={(e) =>
                      Object.assign(e.target.style, linkHoverStyle)
                    }
                    onMouseOut={(e) => Object.assign(e.target.style, linkStyle)}
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-md-4">
              <h5 style={{ color: "#ff8c00" }}>Connect With Us</h5>
              <div className="d-flex justify-content-start mt-3">
                <a
                  href="#"
                  className="me-3"
                  style={iconStyle}
                  onMouseOver={(e) =>
                    Object.assign(e.target.style, iconHoverStyle)
                  }
                  onMouseOut={(e) => Object.assign(e.target.style, iconStyle)}
                >
                  <FaFacebookF />
                </a>
                <a
                  href="#"
                  className="me-3"
                  style={iconStyle}
                  onMouseOver={(e) =>
                    Object.assign(e.target.style, iconHoverStyle)
                  }
                  onMouseOut={(e) => Object.assign(e.target.style, iconStyle)}
                >
                  <FaTwitter />
                </a>
                <a
                  href="#"
                  className="me-3"
                  style={iconStyle}
                  onMouseOver={(e) =>
                    Object.assign(e.target.style, iconHoverStyle)
                  }
                  onMouseOut={(e) => Object.assign(e.target.style, iconStyle)}
                >
                  <FaInstagram />
                </a>
                <a
                  href="https://www.linkedin.com/in/tamir-phillips-6096922ba"
                  className="me-3"
                  style={iconStyle}
                  onMouseOver={(e) =>
                    Object.assign(e.target.style, iconHoverStyle)
                  }
                  onMouseOut={(e) => Object.assign(e.target.style, iconStyle)}
                >
                  <FaLinkedinIn />
                </a>
                <a
                  href="https://github.com/TamirP123"
                  style={iconStyle}
                  onMouseOver={(e) =>
                    Object.assign(e.target.style, iconHoverStyle)
                  }
                  onMouseOut={(e) => Object.assign(e.target.style, iconStyle)}
                >
                  <FaGithub />
                </a>
              </div>
            </div>
          </div>
          <hr className="my-4" style={{ backgroundColor: "#ff8c00" }} />
          <div className="row align-items-center">
            <div className="col-md-6 small">
              &copy; 2024 Stay Motivated. All Rights Reserved.
            </div>
            <div className="col-md-6 text-md-end small">
              <a
                href="#privacy"
                style={linkStyle}
                onMouseOver={(e) =>
                  Object.assign(e.target.style, linkHoverStyle)
                }
                onMouseOut={(e) => Object.assign(e.target.style, linkStyle)}
                className="me-3"
              >
                Privacy Policy
              </a>
              <a
                href="#terms"
                style={linkStyle}
                onMouseOver={(e) =>
                  Object.assign(e.target.style, linkHoverStyle)
                }
                onMouseOut={(e) => Object.assign(e.target.style, linkStyle)}
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FooterComponent;
