import React from 'react'
import './why.css'
import {BsShieldShaded} from 'react-icons/bs'
import {FaServer} from 'react-icons/fa'
import {GrStackOverflow} from 'react-icons/gr'
const Why = () => {
  return (
    <div className='why-choose-section'>
        <div className="why-choose-us-text-container">
            <div className="header" data-aos="fade-up">
                <span className="header-line"></span>
                <h2>why choose us</h2>
            </div>
            <h1 data-aos="fade-up">best qualities</h1>
            <p data-aos="fade-up">Our Team combines an advanced knowledge in arbitrage trading,marketing, real estate and good work ethics to give you the best services you deserve.</p>
        </div>
        <div className="why-choose-us-card-container">
            <div className="why-choose-us-card" data-aos="fade-up">
                <img src="/man.png" alt="" />
                <h2>Ultra Fast & Secure</h2>
                <p>we employ the use of latest reliable and sophisticated technology, to ensure strongly secured, fast and reliable transactions.</p>
            </div>
            <div className="why-choose-us-card" data-aos="fade-up">
                <img src="/server.png" alt="" />
                <h2>Highly Scalable</h2>
                <p>your investments are very much upgradeable at any point you want to. we provide our clients the ability to scale up their investments.</p>
            </div>
            <div className="why-choose-us-card" data-aos="fade-up">
                <img src="/scale.png" alt="" />
                <h2>Reliable & Low Cost</h2>
                <p>We use our advanced experience in arbitrage trading to minimize our clients cost of trade and unnecessary transaction expenses.</p>
            </div>
        </div>
    </div>
  )
}

export default Why