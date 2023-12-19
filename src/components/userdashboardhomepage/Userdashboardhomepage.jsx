import React from 'react'
import './userdashboardhomepage.css'
import {BsArrowRightShort} from 'react-icons/bs'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useState,useEffect,useRef } from 'react'
import {IoIosArrowRoundUp,IoIosArrowRoundDown} from 'react-icons/io'
import {MdOutlineContentCopy} from 'react-icons/md'
import {FiLink} from 'react-icons/fi'
const Userdashboardhomepage = ({route}) => {
    const navigate = useNavigate()
    const [clipBoard, setClipBoard] = useState(false)
    const [userData, setUserData] = useState()
    const [loader,setLoader] = useState(false)
    const copy = ()=>{
        navigator.clipboard.writeText(clipRef.current.value)
    }
    const clipRef = useRef(null)
    useEffect(()=>{
        setLoader(true)
        if(localStorage.getItem('token')){
            const getData = async()=>{
                const req = await fetch(`${route}/api/getData`,{
                    headers: {
                    'x-access-token': localStorage.getItem('token')
                    }
                })
                const res = await req.json()
                setUserData(res)
                setLoader(false) 
            }
            getData()
        }
        else{
            navigate('/login')
        }
    },[])
  return (
    <div className='homewrapper'>
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
    <div className='dashboardhomepage'>
       
        <div className="dashboardhomepagewrapper">
            <div className="welcome-kyc-section">
                <p>welcome!</p>
                <div className="username-container">
                    <h2>{userData ? userData.firstname : ''}</h2>
                    <button className="active-investment-btn" onClick={()=>{
                        navigate('/investments')
                    }}>
                        active investment
                        <BsArrowRightShort />
                    </button>
                </div>
                <div className="kyc-card-wrapper">
                    <div className="kyc-card">
                        <h3>kyc unverified</h3>
                        <p>As mandated by the anti-fraud authority, you are to submit your KYC (know your customer), To help us prevent fraud from our system.</p>
                        <Link to='/myprofile'>start kyc verification    
                        </Link>
                        <span className="kyc-line"></span>
                    </div>
                </div>
            </div>
            <div className="overview-container">
                <div className="overview-card">
                    <div className="amount-header">
                        <h2>Total Deposit</h2>
                        <div className="amount-holder">
                            <h3>$ {userData && userData.totaldeposit !== undefined ? userData.totaldeposit : ''}.00 USD</h3>
                            <span className="arrow-p">
                                <p>1.93%</p>
                                <IoIosArrowRoundUp />
                            </span>
                        </div>
                    </div>
                    <div className="amount-pouches">
                        <h2>current deposit</h2>
                        <h3>${userData && userData.invest.length !== 0 ? userData.invest[userData.invest.length - 1].amount : 0}.00 USD</h3>
                    </div>
                    <div className="amount-pouches">
                        <h2>invested</h2>
                        <h3>$ {userData ? userData.totalprofit : ''}.00 USD</h3>
                    </div>
                    <img src="/bar.png" alt="" className="bar"/>
                </div>
                <div className="overview-card">
                <div className="amount-header">
                        <h2>Total Withdraw</h2>
                        <div className="amount-holder">
                            <h3>${userData ? userData.totalwithdraw : ''}.00 USD </h3>
                            <span className="red">
                                <p>1.93%</p>
                                <IoIosArrowRoundDown />
                            </span>
                        </div>
                    </div>
                    <div className="amount-pouches">
                        <h2>interest earned</h2>
                        <h3>${userData ? userData.totalprofit : ''}.00 USD</h3>
                    </div>
                    <div className="amount-pouches">
                        <h2>bonus</h2>
                        <h3>${userData ? userData.refBonus : ''}.00 USD</h3>
                    </div>
                    <img src="/bar2.png" alt="" className="bar" />
                </div>
                <div className="overview-card">
                <div className="amount-header">
                        <h2>Balance in Account</h2>
                        <div className="amount-holder">
                            <h3>${userData ? userData.funded : ''}.00 USD </h3>
                            
                        </div>
                    </div>
                    <div className="amount-pouches">
                        <h2>from deposits</h2>
                        <h3>${userData ? userData.totaldeposit : ''}.00 USD</h3>
                    </div>
                    <div className="amount-pouches">
                        <h2>from profits</h2>
                        <h3>${userData ? userData.totalprofit : ''}.00 USD</h3>
                    </div>
                    <img src="/bar3.png" alt="" className="bar" />
                </div>
            </div>
            <div className="price-chartt-section">
                <iframe src="https://widget.coinlib.io/widget?type=chart&theme=light&coin_id=859&pref_coin_id=1505" style={{width:"100%",height:"536px",scrolling:"none",marginWidth:"0",marginHeight:"0", frameBorder:"0", border:"0",lineHeight: '14px'}}></iframe>
            </div>
            <div className="referral-section">
                <div className="referral-card1">
                    <div className="referraltext-wrapper">
                        <div className="referral-text-container">
                            <h2>refer us and earn more</h2>
                            <p>Use the bellow link to invite your friends.</p>
                        </div>
                        <button className="invite-btn">invite</button>
                    </div>
                    <div className="click-to-copy-container">
                        <button className='clipboard-btn'>
                            <FiLink />
                        </button>
                        <input type="text" value={userData ? userData.referral : ''} ref={clipRef}/>
                        <button className={`clipboard-btn ${clipBoard ? 'copied' : ''}` } onClick={()=>{
                            copy()
                            setClipBoard(!clipBoard)
                        }}>
                            {
                                clipBoard ?
                                'copied!' : <MdOutlineContentCopy />
                            }
                        </button>
                    </div>  
                </div>
                <div className="referral-card1">
                    <div className="referraltext-wrapper">
                        <div className="referral-text-container">
                            <h2>my referral</h2>
                        </div>
                        <div className="referral-text-container small-card">
                            <h2>{userData ? userData.referred.length : '        '}</h2>
                            <p>referred users</p>
                        </div>
                        <div className="referral-text-container small-card">
                            <h2>{userData ? userData.refBonus : '        '} USD</h2>
                            <p>referral bonus</p>
                        </div>

                    </div>
                    <img src="/bar4.png" alt="" className="bar4" />
                </div>
            </div>
        </div>
    </div>
    </div>
  )
}

export default Userdashboardhomepage