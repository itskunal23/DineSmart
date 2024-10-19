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
                <a className="nav-link active" href="#">Home</a>
            </ul>
          </div>
        </div>
      </nav>

      <header className="text-center text-white masthead" style={{ background: "url('/Users/jameskang/Desktop/Desktop - James’s MacBook Pro/VSC/CodeFest/DineSmart/DineSmart/src/assets/Components/HomePage/background.jpg') no-repeat center center", backgroundSize: "cover" }}>
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

      <script src="assets/bootstrap/js/bootstrap.min.js"></script>
    </div>
  );
};

export default Home;
