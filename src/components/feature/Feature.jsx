import React from 'react'
import './feature.css'
import {FaStackOverflow} from 'react-icons/fa'
import {IoAnalyticsOutline} from 'react-icons/io5'
import {BsWindowSidebar} from 'react-icons/bs'
import {
    BiSupport
} from 'react-icons/bi'
import {AiOutlineFund} from 'react-icons/ai'
const Feature = () => {
  return (
    <div className='about-section feature-section' id='feature'>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1919 274" className='svg-line'>
        <path fill="none" stroke="#565674" stroke-dasharray="12" d="M-150,908.21396 C-151.16508,816.022735 -42.010869,767.607158 177.462632,762.967229 C506.672884,756.007334 405.185109,537.831699 865.446032,604.840708 C1325.70696,671.849717 1270.71837,423 1687.44603,540.526473 C2104.17369,658.052946 2011.79501,428.896794 2076.92909,423 C2075.67597,582.585165 2075.67597,744.323151 2076.92909,908.21396 L-150,908.21396 Z" opacity=".5" transform="translate(-1 -508)"/>
      </svg>
        <div className="about-wrapper feature-wrapper">
        <div className="why-choose-us-text-container about-text">
            <div className="header" data-aos="fade-up">
                <span className="header-line"></span>
                <h2>special features</h2>
            </div>
            <h1 data-aos="fade-up">Our features and benefits</h1>
            <p data-aos="fade-up">
                 The Bloxvest ecosystem is based on blockchain and we solved issues of current and future
            </p>
        </div>
        <div className="feature-card-container" data-aos="fade-up">
            <div className="feature-card" data-aos="fade-up">
                <div className="feature-card-text-container">
                    <FaStackOverflow/>
                    <h2>identify asset</h2>
                    <p>We identify high potential assets using our intelligent financial markets systems, combined with expert advice.</p>
                </div>
            </div>
            <div className="feature-card" data-aos="fade-up">
                <div className="feature-card-text-container" >
                    <IoAnalyticsOutline />
                    <h2>analyze risk</h2>
                    <p>We carry out risk-reward analysis to determine the risk exposure for each asset we select.</p>
                </div>
            </div>
            <div className="feature-card" data-aos="fade-up">
                <div className="feature-card-text-container">
                    <BiSupport />
                    <h2>periodic support</h2>
                    <p>All our plans yields circle profits depending on the plan activated. All that is required from a user is to activate any of the available plans</p>
                </div>
            </div>
            <div className="feature-card" data-aos="fade-up">
                <div className="feature-card-text-container">
                    <BsWindowSidebar />
                    <h2>manage portfolio</h2>
                    <p>We create and manage client portfolio using artificial intelligence and expert investment managers.</p>
                </div>
            </div>
        </div>
        </div>
    </div>
  )
}

export default Feature