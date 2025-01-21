import { Link } from "react-router-dom";

/* eslint-disable react/no-unknown-property */
function Header() {
  return (
    <header className="p-3 text-bg-dark">
      <div className="container" bis_skin_checked="1">
        <div
          className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start"
          bis_skin_checked="1"
        >
          <a
            href="/"
            className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none"
          >
            <svg
              className="bi me-2"
              width="40"
              height="32"
              role="img"
              aria-label="Bootstrap"
            >
              <use xlinkHref="#bootstrap"></use>
            </svg>
          </a>

          

          <form
            className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3"
            role="search"
          >
            
          </form>

          <div className="text-end" bis_skin_checked="1">
            <Link to="/ServiceBookingApp" className="" aria-current="page">
              <svg className="bi pe-none me-2" width="16" height="16">
                <use xlinkHref="#home"></use>
              </svg>
              <button type="button" className="btn btn-outline-light me-2">
                Services
              </button>
            </Link>

            <Link to="ServiceBookingApp/create-post" className="">
              <svg className="bi pe-none me-2" width="16" height="16">
                <use xlinkHref="#speedometer2"></use>
              </svg>

              <button type="button" className="btn btn-warning">
                Create Services
              </button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
