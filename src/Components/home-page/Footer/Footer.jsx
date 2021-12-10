import "./Footer.css";
const Footer = () => {
  return (
    <footer className="text-center text-lg-start  text-white mt-3">
      <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
        <div>
          <button href="" className="me-4 text-reset border-0 bg-transparent">
            <i className="fab fa-facebook-f"></i>
          </button>
          <button href="" className="me-4 text-reset border-0 bg-transparent">
            <i className="fab fa-twitter"></i>
          </button>
          <button href="" className="me-4 text-reset border-0 bg-transparent">
            <i className="fab fa-google"></i>
          </button>
          <button href="" className="me-4 text-reset border-0 bg-transparent">
            <i className="fab fa-instagram"></i>
          </button>
          <button href="" className="me-4 text-reset border-0 bg-transparent">
            <i className="fab fa-linkedin"></i>
          </button>
          <button href="" className="me-4 text-reset border-0 bg-transparent">
            <i className="fab fa-github"></i>
          </button>
        </div>
      </section>

      <section className="">
        <div className="container text-center text-md-start mt-5">
          <div className="row mt-3">
            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                <i className="fas fa-gem me-3"></i>Task easy
              </h6>
              <p>
                We provide an effective task management system to reach your
                target whatever your role
              </p>
            </div>

            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Products</h6>
              <p>
                <a href="#home" className="text-reset">
                  Home
                </a>
              </p>
              <p>
                <a href="#about" className="text-reset">
                  About us
                </a>
              </p>
              <p>
                <a href="#features" className="text-reset">
                  Our feature
                </a>
              </p>
              <p>
                <a href="#team" className="text-reset">
                  Our team
                </a>
              </p>
            </div>


            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
              <p>
                <i className="fas fa-home me-3"></i> Egypt
              </p>
              <p>
                <i className="fas fa-envelope me-3"></i>
                info@example.com
              </p>
              <p>
                <i className="fas fa-phone me-3"></i> + 01 234 567 88
              </p>
              <p>
                <i className="fas fa-print me-3"></i> + 01 234 567 89
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="text-center p-4">
        © 2021 Copyright:
        <a className="text-reset fw-bold" href="https://mdbootstrap.com/">
          Taskeasy.com
        </a>
      </div>
    </footer>
  );
};

export default Footer;
