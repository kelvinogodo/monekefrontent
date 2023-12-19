import React from 'react'
import './footer.css'
import { Link } from 'react-router-dom'
const Footer = () => {
  return (
    <footer className='footer'>
        <div className="trusted-patners-section">
            <h2 data-aos="fade-up">trusted partners</h2>
            <div className="trusted-patners-img-container">
                <img src="/a-xs-light.png" alt="" className="trusted-patener-icon" data-aos="fade-up"/>
                <img src="/b-xs-light.png" alt="" className="trusted-patener-icon" data-aos="fade-up"/>
                <img src="/c-xs-light.png" alt="" className="trusted-patener-icon" data-aos="fade-up"/>
                <img src="/d-xs-light.png" alt="" className="trusted-patener-icon" data-aos="fade-up"/>
                <img src="/e-xs-light.png" alt="" className="trusted-patener-icon" data-aos="fade-up"/>
            </div>
        </div>
        <div className="quicklinks-container">
            <div className="quicklink-card-container">
                <div className="quicklink-card" data-aos="fade-up">
                    <img src="/txtlog.png" alt="" className='logo-txt' />
                </div>
                <div className="quicklink-card" data-aos="fade-up">
                    <Link href="/">home</Link>
                    <a href="#about">about</a>
                </div>
                <div className="quicklink-card" data-aos="fade-up">
                    <a href="#roadmap">roadmap</a>
                    <a href="#faq">faqs</a>
                </div>
                <div className="quicklink-card" data-aos="fade-up">
                    <a href="#why">why choose us</a>
                    <a href="#contact">contact</a>
                </div>
            </div>
            <div className="copyright-container">
                <div className="copyright-txt">
                    <p> copyright &copy; 2017 </p>
                </div>
                <div className="policy-txt">
                    <a href="#">privacy policy</a>
                    <a href="#">terms and condition</a>
                </div>
            </div>
        </div>
    </footer>
  )
}

export default Footer