import React from 'react';
import { NavLink } from 'react-router-dom';
import Navbar from './Navbar';

const LandingPage = () => {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section
        id="home"
        className="hero-section text-white text-center py-5"
        style={{
          position: 'relative',
          backgroundImage: 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRA9jrKk7C5jagSsZoI9HfzC5SzVBupSwQP_g&s)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          width: '100%',
          minHeight: '90vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0',
          margin: '0',
          color: '#fff',
        }}
      >
        {/* Overlay to apply opacity to the entire image */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1,
          }}
        ></div>

        {/* Content on top of the overlay */}
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            textAlign: 'center',
            padding: '20px',
          }}
        >
          <h1
            className="display-4 font-weight-bold"
            style={{ fontSize: '3rem', textShadow: '2px 2px 8px rgba(0,0,0,0.7)' }}
          >
            Welcome to MyApp
          </h1>
          <p
            className="lead mb-4"
            style={{ fontSize: '1.5rem', maxWidth: '800px', margin: '0 auto' }}
          >
            Your trusted partner in managing your passwords securely
          </p>
          <NavLink
            to="/login"
            className="btn btn-lg btn-light px-4 py-2 shadow-lg"
            style={{
              fontSize: '1.2rem',
              borderRadius: '30px',
              textTransform: 'uppercase',
            }}
          >
            Get Started
          </NavLink>
        </div>
      </section>

      {/* About Us Section */}
      <section
        id="about"
        className="about-us py-5"
        style={{ backgroundColor: '#f8f9fa' }}
      >
        <div className="container">
          <h2
            className="text-center mb-4 text-primary"
            style={{
              fontWeight: 'bold',
              textTransform: 'uppercase',
              letterSpacing: '2px',
            }}
          >
            About Us
          </h2>
          <div className="row">
            {/* Left Column: About Us Information */}
            <div className="col-md-6 mb-4">
              <h3 className="text-primary" style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                Our Mission
              </h3>
              <p style={{ fontSize: '1.2rem', lineHeight: '1.8' }}>
                We are a team of passionate developers committed to building secure, efficient, and user-friendly web applications. Our goal is to ensure the safety of your sensitive information with the highest level of security, making it simple and reliable.
              </p>
              <h3 className="text-primary mt-4" style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                Our Security Measures
              </h3>
              <p style={{ fontSize: '1.2rem', lineHeight: '1.8' }}>
                We implement the latest security standards to protect your passwords. All passwords are stored securely using modern hashing techniques such as <strong>bcrypt</strong>, ensuring that even if data is compromised, your information remains safe. Additionally, we enforce secure authentication mechanisms, including two-factor authentication (2FA), to add an extra layer of protection.
              </p>
              <h4 className="text-primary mt-4" style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>
                Why Choose Us?
              </h4>
              <ul style={{ fontSize: '1.2rem' }}>
                <li>End-to-end encryption of your data</li>
                <li>Zero-knowledge authentication (we don't store your passwords)</li>
                <li>Secure hashing algorithms (bcrypt, SHA-256)</li>
                <li>Two-factor authentication for additional security</li>
              </ul>
            </div>

            {/* Right Column: Security Features (Image) */}
            <div className="col-md-6">
              <div
                className="img-fluid rounded shadow-lg"
                style={{
                  backgroundImage:
                    'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnkJ7m_8QAlrdbsRLBiAqdArsrfqmdyRYiOQ&s)',
                  backgroundSize: 'cover',
                  height: '100%',
                  width: '100%',
                  minHeight: '400px',
                  borderRadius: '10px',
                  boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.3)',
                }}
              ></div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="row mt-5">
            <div className="col-12 text-center">
              <p style={{ fontSize: '1.4rem', lineHeight: '1.8' }}>
                Our commitment to security extends beyond just passwords. We constantly monitor and update our systems to ensure we meet the highest security standards, including data encryption, secure password hashing, and vulnerability assessments.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section 
  id="contact" 
  className="contact-us py-5" 
  style={{ 
    position: 'relative',
    width: '100%',
    minHeight: '100vh',
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center',
  }}
>
  {/* Background Image with Darker Overlay */}
  <div 
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundImage: 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpLHnRQaWcCccXcPnwkIGuLQaFFsifazKqig&s)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      zIndex: 1,
    }}
  ></div>

  {/* Darker Overlay */}
  <div 
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      zIndex: 2,
    }}
  ></div>

  {/* Form Content */}
  <div 
    className="container" 
    style={{
      position: 'relative',
      zIndex: 3,
      padding: '30px',
      backgroundColor: 'transparent',  // Remove the background box
      borderRadius: '10px',
      maxWidth: '600px',
      margin: '0 auto',
      boxShadow: 'none',  // Remove any shadows
    }}
  >
    <div className="row">
      {/* Left Column: Contact Form */}
      <div className="col-md-12">
        <form>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="name" style={{ color: 'white', fontSize: '1.2rem' }}>Name</label>
              <input 
                type="text" 
                className="form-control" 
                id="name" 
                placeholder="Your Name" 
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="email" style={{ color: 'white', fontSize: '1.2rem' }}>Email</label>
              <input 
                type="email" 
                className="form-control" 
                id="email" 
                placeholder="Your Email" 
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="message" style={{ color: 'white', fontSize: '1.2rem' }}>Message</label>
            <textarea 
              className="form-control" 
              id="message" 
              rows="4" 
              placeholder="Your Message"
            ></textarea>
          </div>
          <button 
            type="submit" 
            className="btn btn-primary btn-lg shadow-lg px-5 py-2" 
            style={{ borderRadius: '30px' }}
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  </div>
</section>


      {/* Footer Section */}
      <footer
        className="text-white text-center py-3"
        style={{
          width: '100%', // Full width of the page
          position: 'relative', // Footer should be at the bottom
          backgroundColor: 'rgba(0, 0, 0, 0.85)', // Slightly dark background with some transparency
        }}
      >
        <p className="mb-0" style={{ fontSize: '1rem' }}>
          &copy; 2024 MyApp. All rights reserved.
        </p>
      </footer>
    </>
  );
};

export default LandingPage;
