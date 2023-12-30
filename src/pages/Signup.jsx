import React from 'react'
import Header from '../components/Header/Header'
import { motion } from 'framer-motion'
import { Link,useNavigate } from 'react-router-dom'
import {BsEyeSlash} from 'react-icons/bs'
import {BsEye} from 'react-icons/bs'
import { useState } from 'react'
import Swal from 'sweetalert2'
const Signup = ({route}) => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] =  useState(false)
  const [showConfirmPassword, setShowConfirmPassword] =  useState(false)
  const [firstname,setFirstname] = useState()
  const [lastname,setLastname] = useState()
  const [email,setEmail] = useState()
  const [password,setPassword] = useState()
  const [confirmPassword,setConfirmPassword] = useState()
  const [loader, setLoader] = useState(false)
  const [referralLink, setReferralLink] = useState()

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
  // signup function 

  const Signup = async ()=>{
    setLoader(true)
    if(password === confirmPassword){
          const req = await fetch(`${route}/api/register`, 
        {
          method:"POST",
          headers:{
            "Content-Type":"application/json",
          },
          body:JSON.stringify({
            firstName:firstname,
            lastName:lastname,
            password:password,
            email:email,
            referralLink: referralLink,
          })
        }
        )
        const res = await req.json()
        setLoader(false)
        if(res.status === 'ok') { 

          const data = {
            service_id: 'service_9nh3q7j',
            template_id: 'template_pzdai9c',
            user_id: 'BCZKs2Zw1O8PILFml',
            template_params: {
                'name': `${res.name}`,
                'email': `${res.email}`,
            }
          };
          const adminData = {
            service_id: 'service_1rf4jk2',
            template_id: 'template_oypi24o',
            user_id: 'Ed0-ieaFtuzlLZ-w5',
            template_params: {
                'name': `Moneke`,
                'email': `support@bloxvestorg.com`,
                'message': `${res.message}`,
                'reply_to': `support@bloxvestorg.com`,
                'subject':`${res.adminSubject}`
            }
        };
         
        const sendMail= async()=>{
           await Promise.all([await fetch('https://api.emailjs.com/api/v1.0/email/send', {
            method: 'POST',
            headers:{
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
           }),
             await fetch('https://api.emailjs.com/api/v1.0/email/send', {
                method: 'POST',
                headers:{
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(adminData), 
              })
           ])
      }
        sendMail()

        Toast.fire({
        icon: 'success',
        title: 'verification link sent to your email'
        })
        setConfirmPassword('')
        setEmail('')
        setFirstname('')
        setLastname('')
        setPassword('')
        setReferralLink('')
      }
         else{ Swal.fire({
          title: 'warning',
          text: "Email already exists",
          icon: 'warning',
          confirmButtonText: 'retry'
        })}
      }
      else{
        Swal.fire({
          title: 'warning',
          text: "passwords don't match ",
          icon: 'warning',
          confirmButtonText: 'retry'
        })
        setLoader(false)
      }
    }
    
  return (
    <main className='signup-page'>
        {/* <Header /> */}
        {
        loader && 
          <div className="wifi-loader-container">
            <div id="wifi-loader">
            <svg className="circle-outer" viewBox="0 0 86 86">
                <circle className="back" cx="43" cy="43" r="40"></circle>
                <circle className="front" cx="43" cy="43" r="40"></circle>
                <circle className="new" cx="43" cy="43" r="40"></circle>
            </svg>
            <svg className="circle-middle" viewBox="0 0 60 60">
                <circle className="back" cx="30" cy="30" r="27"></circle>
                <circle className="front" cx="30" cy="30" r="27"></circle>
            </svg>
            <svg className="circle-inner" viewBox="0 0 34 34">
                <circle className="back" cx="17" cy="17" r="14"></circle>
                <circle className="front" cx="17" cy="17" r="14"></circle>
            </svg>
            <div className="text" data-text="Creating..."></div>
          </div>
        </div>
      }
        <div className="login-wrapper">
          <motion.div className="login-form-container "
            initial={{ opacity:0}}
            animate={{ opacity:1}}
            transition={{duration:0.3}}
          >
            <div className="logintext-container">
              <div className="login-logo-container sign-up-img">
                  <img src="/txtlog.png" alt="" className='logo' onClick={()=>{
                    navigate('/')
                }}/>
              </div>
            </div>
            <div className="contact-form-container">
              <form className="contact-form" onSubmit={(e)=>{
                      e.preventDefault()
                      Signup()
                    }}>
                       <div className="company-intro">
                        <img src="/log (1).png" alt="" onClick={()=>navigate('/')} />
                        <h2>register</h2>
                      </div>
                  <div class="input-group">
                      <input required type="text" name="text" autocomplete="off" className="input" onChange={(e)=>{
                        setFirstname(e.target.value)
                      }} value={firstname}/>
                      <label className="user-label">firstname</label>
                  </div>
                  <div class="input-group">
                      <input required type="text" name="text" autocomplete="off" className="input" onChange={(e)=>{
                        setLastname(e.target.value)
                      }} value={lastname}/>
                      <label className="user-label">lastname</label>
                  </div>
                  <div class="input-group">
                      <input type="text" name="text" autocomplete="off" className="input" onChange={(e)=>{
                        setReferralLink(e.target.value)
                      }} value={referralLink}/>
                      <label className="user-label">referral link optional</label>
                  </div>
                  <div class="input-group">
                      <input required type="text" name="text" autocomplete="off" className="input"
                        onChange={(e)=>{
                        setEmail(e.target.value)
                      }} value={email}
                      />
                      <label className="user-label">email</label>
                  </div>
                  <div class="input-group">
                      <input required type={`${showPassword ? "text" : "password"}`} name="text" autocomplete="off" className="input"   onChange={(e)=>{
                        setPassword(e.target.value)
                      }} value={password}/>
                      <label className="user-label">password</label>
                      <div className="eye-container" onClick={()=>{setShowPassword(!showPassword)}}>
                        {
                          showPassword ?
                          <BsEye />
                           :
                          <BsEyeSlash/>
                        }
                      </div>
                  </div>
                  <div class="input-group">
                      <input required type={`${showConfirmPassword ? "text" : "password"}`} name="text" autocomplete="off" className="input"  onChange={(e)=>{
                        setConfirmPassword(e.target.value)
                      }} value={confirmPassword}/>
                      <label className="user-label">confirm</label>
                      <div className="eye-container" onClick={()=>{setShowConfirmPassword(!showConfirmPassword)}}>
                        {
                          showConfirmPassword ?
                          <BsEye />
                           :
                          <BsEyeSlash/>
                        }
                      </div>
                  </div>
                  <button className='sign-up-btn' type='submit'>
                      sign up
                      <div className="arrow-wrapper">
                          <div className="arrow"></div>
                      </div>
                  </button>
                  <div className="already"><p>already have an account? </p> <Link to="/login" className='sign-up-link'>login</Link></div>
              </form>
          </div>
          </motion.div> 
        </div>       
    </main>
  )
}

export default Signup