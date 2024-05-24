const NavbarComponent = () => {

	return (
      <nav id="navbar" className="navbar navbar-expand-lg navbar-dark">
      <div className="container-fluid">
        <a className="navbar-brand mt-1 fs-2 p-2 title" href="#">
          Stay Motivated.
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse " id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 ">
            <li className="nav-item mx-5 ">
              <a className="nav-link active " aria-current="page" href="#">
                Motivation
              </a>
            </li>
            <li className="nav-item mx-5">
              <a className="nav-link active" aria-current="page" href="#">
                Self Improvement
              </a>
            </li>
            <li className="nav-item mx-5">
              <a className="nav-link active" aria-current="page" href="#">
                Success Story
              </a>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">
                Sign up
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavbarComponent;
