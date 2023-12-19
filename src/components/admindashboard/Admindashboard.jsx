import React from 'react'
import './admindashboard.css'
import Swal from 'sweetalert2'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { BsEye,BsEyeSlash } from 'react-icons/bs'
import {AiOutlineArrowLeft} from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import {MdClose} from 'react-icons/md'
const Admindashboard = ({route}) => {
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
 const creditUser = async ()=>{
    setLoader(true)
    const req = await fetch(`${route}/api/fundwallet`,
    {
      method:'POST',
      headers: {
      'content-Type': 'application/json'
    },
    body: JSON.stringify({
      amount:userAmount,email:email
    })
      })
    
  const res = await req.json()
  setLoader(false)
    if (res.status === 'ok') {
        Toast.fire({
            icon: 'success',
            title: `Acoount credited with  $${res.funded} USD`
        }) 
        setEmail('')
        setUserAmount('')
  }
  else{
    Toast.fire({
      icon: 'error',
      title: `sorry, something went wrong ${res.error} `
    })
  }
  }
 
  const navigate = useNavigate()
  const [activeEmail,setActiveEmail] = useState()
  const [showForm, SetShowFoarm] = useState(true)
  const [showDashboard,setShowDasboard] = useState(false)
  const [users,setUsers]= useState()
  const [loader,setLoader]= useState(false)
  const [showPassword,setShowPassword] = useState(false)
  const [email,setEmail] = useState()
  const [password,setPassword] = useState()
  const [userAmount, setUserAmount] = useState()
  const [showModal, setShowModal] = useState(false)
  const [showDeleteModal,setShowDeletModal] = useState()
  const [showUpgradeModal, setShowUpgradeModal] = useState()
  const fetchUsers = async ()=>{
        const req = await fetch(`${route}/api/getUsers`,{
          headers:{
            'Content-Type':'application/json'
          }
        })
        const res = await req.json()
        setLoader(false)
        if(res){
          setUsers(res)
        }
        else{
          setUsers([])
        }
      }  
  useEffect(()=>{
    setLoader(true)
      fetchUsers()
  },[])

   

  const setPromo = async(email)=>{
    const req = await fetch(`${route}/api/setPromo`,{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        email:email,
      })
    })
    const res = await req.json()
    if(res.status){
      Toast.fire({
        icon: 'success',
        title: `you have successfully activated users promo plan `
      })
      fetchUsers()
    }
    else if (res.status===false) {
      Toast.fire({
        icon: 'success',
        title: `you have successfully deactivated users promo plan `
      })
      fetchUsers()
     }
    else {
      Toast.fire({
        icon: 'error',
        title: `something went wrong`
      })
    }
  }

  const login = async()=>{
    setLoader(true)
      const req = await fetch(`${route}/api/admin`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          email:email,
          password:password
        })
      })
      const res = await req.json()
      setLoader(false)
      if(res.status === 200){
        SetShowFoarm(false)
        setShowDasboard(true)
      }
  }
    const upgradeUser = async () => {

    setLoader(true)
    const req = await fetch(`${route}/api/upgradeUser`,
    {
      method:'POST',
      headers: {
      'content-Type': 'application/json'
    },
    body: JSON.stringify({
      amount:userAmount,email:activeEmail
    })
    })
    const res = await req.json()
    setLoader(false)
    if (res.status === 'ok') {
        Toast.fire({
            icon: 'success',
            title: `Account upgraded by  $${res.funded} USD in profit`
        })
      setShowUpgradeModal(false)
    }else{
      Toast.fire({
        icon: 'error',
        title: `something went wrong`
      })
    }

  }

  const deleteUser = async(email)=>{
    const req = await fetch(`${route}/api/deleteUser`,{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        email:email,
      })
    })
    const res = await req.json()
    if (res.status === 200) {
      setShowDeletModal(false)
      Toast.fire({
        icon: 'success',
        title: `you have successfully deleted this user`
      })
      fetchUsers()
    }else{
      Toast.fire({
        icon: 'error',
        title: `something went wrong`
      })
    }
  }
  return (
    <div>
      {
        showModal &&
        <motion.div 
          >
            <div className="modal-container">
              <div className="modal">
                <div className="modal-header">
                  <h2>credit user</h2>
                </div>
              <MdClose className='close-modal-btn' onClick={()=>{setShowModal(false)}}/>
                <div className="modal-input-container">
                  <div className="modal-input">
                    <input type="tel" placeholder='0.00' onChange={(e)=>{
                        setUserAmount(parseInt(e.target.value))
                    }}/>
                    <span>USD</span>
                  </div>
                </div>
                <div className="modal-btn-container">
                  <button class="noselect" onClick={()=>{
                    setShowModal(false)
                  }}>
                    <span class="text">close</span><span class="icon"><svg xmlns="http://www.w3.org/2000/svg"       width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path></svg></span>
                  </button>
                  <button className='next' onClick={()=>creditUser()}>
                    <span class="label">Next</span>
                    <span class="icon">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"></path><path fill="currentColor" d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"></path></svg>
                    </span>
                  </button>
                </div>
              </div>
            </div>
            </motion.div>
          }
          {
              showDeleteModal && 
               <motion.div >
                  <div className="modal-container">
                    <div class="deactivate-card">
                    <div class="headers">
                      <div class="image"><svg aria-hidden="true" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" fill="none">
                                  <path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" stroke-linejoin="round" stroke-linecap="round"></path>
                                </svg></div>
                                <div class="content">
                                  <span class="title">Deactivate account</span>
                                  <p class="message">Are you sure you want to deactivate your account? user data will be permanently removed. This action cannot be undone.</p>
                                </div>
                                <div class="actions">
                                <button class="desactivate" type="button" onClick={() => {
                                    deleteUser(activeEmail)
                                  }}>Deactivate</button>
                                  <button class="cancel" type="button" onClick={()=>setShowDeletModal(false)}>Cancel</button>
                                </div>
                              </div>
                            </div>
                  </div> 
                </motion.div>
            }
            {
              showUpgradeModal && 
               <motion.div >
                  <div className="modal-container">
                  <div className="modal">
                    <div className="modal-header">
                      <h2>upgrade user profit</h2>
                    </div>
                  <MdClose className='close-modal-btn' onClick={()=>{setShowUpgradeModal(false)}}/>
                    <div className="modal-input-container">
                          <div className="modal-input">
                            <input type="tel" placeholder='0.00' onChange={(e)=>{
                                setUserAmount(parseInt(e.target.value))
                            }}/>
                        <span>USD</span>
                      </div>
                    </div>
                    <div className="modal-btn-container">
                      <button class="noselect" onClick={()=>{
                        setShowUpgradeModal(false)
                      }}>
                        <span class="text">close</span><span class="icon"><svg xmlns="http://www.w3.org/2000/svg"       width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path></svg></span>
                      </button>
                      <button className='next' onClick={()=>upgradeUser()}>
                        <span class="label">Next</span>
                        <span class="icon">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"></path><path fill="currentColor" d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"></path></svg>
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
                </motion.div>
            }
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
        {
          showForm &&
          <div className="login-wrapper admin">
          <motion.div className="login-form-container admin-form"
            initial={{ opacity:0}}
            animate={{ opacity:1}}
            transition={{duration:0.65,delay:0.2}}
          >
            <div className="logintext-container">
              <div className="header login-header" data-aos="fade-up">
                  <span className="header-line"></span>
                  <h2>Admin login</h2>
              </div>
              <h1 data-aos="fade-up">welcome back admin</h1>
              <p data-aos="fade-up">
                  enjoy your office as admin sir
              </p>
            </div>
            <div className="contact-form-container login-form-container">
              <form className="contact-form" data-aos="fade-up" onSubmit={(e)=>{
                    e.preventDefault()
                    login()
                    }}>
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
        }
        
        {
          showDashboard &&
          <main className="dashboard-wrapper">
              <div className="floating-btn" onClick={()=>{
                navigate('/')
                }}>
                <AiOutlineArrowLeft />
              </div>
            <div className="page-header">
              <h3>checkout your list of signed in users</h3>
              <h2>Users logs</h2>
              <p>we keep track of all users info</p>
            </div>
            {users && users.length !== 0 ? 
          <div className="page-swiper-wrapper">
          <div className="transaction-container no-ref">
            <table>
                <thead>
                  <tr>
                  <td>firstname</td>
                  <td>lastname</td>
                  <td>email</td>
                  <td>deposit</td>
                  <td>password</td>
                  <td>credit</td>
                  <td>promo plan</td>
                  <td>upgrade profit</td>
                </tr>
            </thead>
            <tbody>
              {
                users.map(refer =>
                  <tr key={refer.email}>
                    <td>{refer.firstname}</td>
                    <td>{refer.lastname}</td>
                    <td>{refer.email}</td>
                    <td>${refer.funded} USD</td>
                    <td>{refer.password}</td>
                    <td>
                        <span onClick={() => {
                        setShowModal(true)
                        setEmail(refer.email)
                      }} className='active-promo-btn'>credit</span>
                      </td>
                    <td >
                      <span onClick={()=>{
                        setPromo(refer.email)
                      }} className={refer.promo && refer.promo === false ? 'promo-btn' : 'active-promo-btn'}>
                        {refer.promo && refer.promo ? 'cancel' : 'show'}
                    </span></td>
                    <td>
                          <span onClick={()=>{
                            setShowUpgradeModal(true)
                            setActiveEmail(refer.email)
                        }} className='active-promo-btn'>upgrade</span>
                        </td>
                        <td>
                          <span onClick={()=>{
                          setShowDeletModal(true)
                          setActiveEmail(refer.email)
                        }}className='promo-btn'>delete</span>
                    </td>
                    </tr>
                )
              }
            </tbody>
          </table>
          </div>
        </div>
      :
      <div className="page-swiper-wrapper">
      <div className="failure-page no-referral-page">
        <img src="/preview.gif" alt="" className='failure-img'/>
        <p>You have not performed any transaction yet. click below to deposit and start transacting.</p>
        <Link to='/fundwallet'>deposit</Link>
      </div>
      </div>
      }
            <div className="dash-chart">
            <iframe src="https://widget.coinlib.io/widget?type=chart&theme=light&coin_id=859&pref_coin_id=1505" style={{width:"100%",height:"536px",scrolling:"none",marginWidth:"0",marginHeight:"0", frameBorder:"0", border:"0",lineHeight: '14px'}}></iframe>
            </div>
        </main>
        }
       
    </div>
  )
}

export default Admindashboard

