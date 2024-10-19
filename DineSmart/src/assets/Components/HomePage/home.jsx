import React from 'react';
import './home.css'

const Home = () => {
  return (
    <div>
      <nav className="navbar navbar-expand bg-light">
        <div className="container">
          <a className="navbar-brand" href="#">Dine Smart</a>
          <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navcol-1"></button>
          <div className="collapse navbar-collapse" id="navcol-1">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link active" href="#">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">About</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Contact</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <header className="text-center text-white masthead" style={{ background: "url('assets/img/bg-masthead.jpg') no-repeat center center", backgroundSize: "cover" }}>
        <div className="overlay"></div>
        <div className="container">
          <div className="row">
            <div className="col-xl-9 mx-auto position-relative">
              <h1 className="mb-5">&lt;Dine Smarter/&gt;</h1>
            </div>
            <div className="col-md-10 col-lg-8 col-xl-7 mx-auto position-relative">
              <form>
                <div className="row">
                  <div className="col-12 col-md-9 mb-2 mb-md-0">
                    <input className="form-control form-control-lg" type="email" placeholder="Enter your location..." />
                  </div>
                  <div className="col-12 col-md-3">
                    <button className="btn btn-primary btn-lg" type="submit">Search</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </header>

      <section className="showcase">
        <div className="container-fluid p-0">
          <div className="row g-0">
            <div className="col-lg-6 text-white order-lg-2 showcase-img" style={{ backgroundImage: "url('assets/img/bg-showcase-1.jpg')" }}></div>
            <div className="col-lg-6 my-auto order-lg-1 showcase-text">
              <h2>Fully Responsive Design</h2>
              <p className="lead mb-0">When you use a theme created with Bootstrap, you know that the theme will look great on any device, whether it's a phone, tablet, or desktop the page will behave responsively!</p>
            </div>
          </div>
          <div className="row g-0">
            <div className="col-lg-6 text-white showcase-img" style={{ backgroundImage: "url('assets/img/bg-showcase-2.jpg')" }}></div>
            <div className="col-lg-6 my-auto order-lg-1 showcase-text">
              <h2>Updated For Bootstrap 5</h2>
              <p className="lead mb-0">Newly improved, and full of great utility classes, Bootstrap 5 is leading the way in mobile responsive web development! All of the themes are now using Bootstrap 5!</p>
            </div>
          </div>
          <div className="row g-0">
            <div className="col-lg-6 text-white order-lg-2 showcase-img" style={{ backgroundImage: "url('assets/img/bg-showcase-3.jpg')" }}></div>
            <div className="col-lg-6 my-auto order-lg-1 showcase-text">
              <h2>Easy to Use &amp; Customize</h2>
              <p className="lead mb-0">Landing Page is just HTML and CSS with a splash of SCSS for users who demand some deeper customization options. Out of the box, just add your content and images, and your new landing page will be ready to go!</p>
            </div>
          </div>
        </div>
      </section>

      <section className="text-center bg-light testimonials">
        <div className="container">
          <h2 className="mb-5">What people are saying...</h2>
          <div className="row">
            <div className="col-lg-4">
              <div className="mx-auto testimonial-item mb-5 mb-lg-0">
                <img className="rounded-circle img-fluid mb-3" src="assets/img/testimonials-1.jpg" alt="testimonial" />
                <h5>Margaret E.</h5>
                <p className="fw-light mb-0">"This is fantastic! Thanks so much guys!"</p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="mx-auto testimonial-item mb-5 mb-lg-0">
                <img className="rounded-circle img-fluid mb-3" src="assets/img/testimonials-2.jpg" alt="testimonial" />
                <h5>Fred S.</h5>
                <p className="fw-light mb-0">"Bootstrap is amazing. I've been using it to create lots of super nice landing pages."</p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="mx-auto testimonial-item mb-5 mb-lg-0">
                <img className="rounded-circle img-fluid mb-3" src="assets/img/testimonials-3.jpg" alt="testimonial" />
                <h5>Sarah W.</h5>
                <p className="fw-light mb-0">"Thanks so much for making these free resources available to us!"</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <script src="assets/bootstrap/js/bootstrap.min.js"></script>
    </div>
  );
};

export default Home;
