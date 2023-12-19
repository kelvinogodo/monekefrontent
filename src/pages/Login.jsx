import React , {useState,useEffect} from 'react'
import { motion } from 'framer-motion'
import { Link,useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import {BsEyeSlash} from 'react-icons/bs'
import {BsEye} from 'react-icons/bs'
const Login = ({route}) => {
  const navigate = useNavigate()
  const [showPassword,setShowPassword] = useState(false)
  const [email,setEmail] = useState()
  const [password,setPassword] = useState()
  const [loader, setLoader] = useState(false)
  const [check,setChecked] =  useState(false)
  console.log(check)
  useEffect(()=>{
    setLoader(true)
    const token = localStorage.getItem('token')
    const checkUser = async()=>{
      if(token !== undefined){
        const req = await fetch(`${route}/api/verify`, {
          headers: {
            'x-access-token': localStorage.getItem('token')
          }
        })
        const res = await req.json()
        setLoader(false)
         
        console.log(res.status)
        if(res.status === 'ok'){
          navigate('/dashboard')
        }
        else{
          setLoader(false)
        }
      }
    }
    checkUser()
  },[])

  // sweet alert function 
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
  
  
  // login function 

  const login = async ()=>{
        setLoader(true)
          const req = await fetch(`${route}/api/login`, 
        {
          method:"POST",
          headers:{
            "Content-Type":"application/json",
          },
          body:JSON.stringify({
            password:password,
            email:email,
            rememberme:check,
          })
        }
        )
        const res = await req.json()
          if (res.status === 'ok') {
            localStorage.setItem('token', res.user)
            Toast.fire({
              icon: 'success',
              title: 'Signed in successfully'
            })
            navigate('/dashboard')
          } 
          else if (res.status === 400) {
            setLoader(false)
            Toast.fire({
              icon: 'error',
              title: 'Error! Email not verified'
            })
          } 
          else if (res.status === 404) {
            setLoader(false)
            Toast.fire({
              icon: 'warning',
              title: 'Warning! incorrect password'
            })
          } 
          else  {
            setLoader(false)
            Toast.fire({
              icon: 'error',
              title: 'User does not exist'
            })
          }
    }
  return (
    <main className='login-page'>
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
            <div className="text" data-text="login in..."></div>
          </div>
        </div>
      }
        <div className="login-wrapper">
          <motion.div className="login-form-container contact-form-containere"
            initial={{ opacity:0}}
            animate={{ opacity:1}}
            transition={{duration:0.3}}
          >
            <div className="logintext-container">
              <div className="login-logo-container sign-up-img">
                  <img src="/txtlog.png" alt="" className='logo' onClick={()=>{
                    navigate('/')
              }}
              />
              </div>
            </div>
            <div className="contact-form-container">
              <form className="contact-form" onSubmit={(e)=>{
                    e.preventDefault()
                    login()
                    }}>
                  <div className="company-intro">
                <img src="/log (1).png" alt="" />
                        <h2>login</h2>
                      </div>
                  <div class="input-group">
                      <input required type="text" name="text" autocomplete="off" className="input" onChange={(e)=>{
                        setEmail(e.target.value)
                      }}/>
                      <label className="user-label">email</label>
                  </div>
                  <div class="input-group">
                      <input required type={`${showPassword ? "text" : "password"}`} name="text" autocomplete="off" className="input" 
                        onChange={(e)=>{
                          setPassword(e.target.value)
                        }}
                      />
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
                  <div className="rememberme-container">
                  <label class="container cont">
                    <input  type="checkbox" onChange={()=>{
                      setChecked(!check)
                      
                    }}/>
                    <div class="checkmark"></div>
                  </label>
                    <p>remember me?</p>
                  </div>
                  <div className="already"><p>don't have an account yet? </p> <Link to="/signup" className='sign-up-link'>signup</Link></div>
                  <button className='sign-up-btn' type='submit' >
                      login
                      <div className="arrow-wrapper">
                          <div className="arrow"></div>
                      </div>
                  </button>
              </form>
          </div>
          </motion.div> 
        </div>       
    </main>
  )
}

export default Login