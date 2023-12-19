import React from 'react'
import './header.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
const Header = () => {
    const [bgColor, setBgColor] = useState(false)
    const changeOnScroll = ()=>{
        if(window.scrollY >= 90){
            setBgColor(true)
        }
        else{
            setBgColor(false)
        }
    }
    window.addEventListener('scroll', changeOnScroll)
    const navigate = useNavigate()
  return (
    <motion.header className={`${bgColor && 'scroll-color'}`}
        initial={{ opacity:0}}
        animate={{opacity:1}}
        transition={{duration:0.65}}
    id='home'>
        <div className="logo-container">
            <img src="/bigLog.png" alt="" className='logo-b' onClick={()=>{
                navigate('/')
              }} />
              <img src="/txtlog.png" alt="" className='logo-txt'/>
        </div>
        <nav>
            <ul>
                <li>
                    <Link to="/">home</Link>
                    <span className='line'></span>
                </li>
                <li>
                    <a href="#about">about</a>
                    <span className='line'></span>
                </li>
                <li>
                    <a href="#faq">faqs</a>
                    <span className='line'></span>
                </li>
                <li>
                    <a href="#contact">contact</a>
                    <span className='line'></span>
                </li>
                <li>
                    <a href="#feature">feature</a>
                    <span className='line'></span>
                </li>
            </ul>
        </nav>
        <div className="sign-up-btn-container">
            <button className='signup-btn' onClick={()=>{navigate('/signup')}}>sign up</button>
        </div>
    </motion.header>
  )
}

export default Header