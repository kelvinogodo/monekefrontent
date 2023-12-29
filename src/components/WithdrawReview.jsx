import React from 'react'
import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import Userdashboardheader from './userdashboardheader/Userdashboardheader'
import './userdashboardwithdraw/userdashboardwithdraw.css'
import {AiOutlineArrowLeft} from 'react-icons/ai'
const WithdrawReview = ({Active,withdrawAmount,closepage,route}) => {
    const [active,setActive] = useState(Active)
    const [wallet,setWallet] = useState()
    const [amount,setAmount] = useState(withdrawAmount)
    const [loader,setLoader] =  useState(false)

    const navigate = useNavigate()
    useEffect(()=>{
        if(Active === undefined){
            navigate('/fundwallet')
        }
    },[])

    // sweet Alert code 

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
      const withdraw = async ()=>{
        setLoader(true)
        const token = localStorage.getItem('token')
        const req = await fetch(`${route}/api/withdraw`,{
            method:'POST',
            headers : {
                'Content-Type':'application/json',
                'x-access-token': token
            },
            body: JSON.stringify({
                wallet:wallet,
                WithdrawAmount:amount,
                method:active.method
            })
        })
        const res = await req.json()
        setLoader(false)
        if(res.status === 'ok'){
              Toast.fire({
                icon: 'success',
                title:  `You have successfully placed your withdrawal of ${res.withdraw}. kindly wait for few minutes to be approved by management,Thanks!`
              })
            
            const data = {
            service_id: 'service_9nh3q7j',
            template_id: 'template_a54kssk',
            user_id: 'BCZKs2Zw1O8PILFml',
            template_params: {
                'name': `${res.name}`,
                'email': `${res.email}`,
                'message': `${res.message}`,
                'reply_to': `support@bloxvestorg.com`,
                'subject':`${res.subject}`
            }
            };
            const adminData = {
            service_id: 'service_9nh3q7j',
            template_id: 'template_a54kssk',
            user_id: 'BCZKs2Zw1O8PILFml',
            template_params: {
                'name': `Moneke`,
                'email': `support@bloxvestorg.com`,
                'message': `${res.adminMessage}`,
                'reply_to': `${res.email}`,
                'subject':`${res.subject}`
            }
            };
         
            const sendMail= async()=>{
            await Promise.all([ fetch('https://api.emailjs.com/api/v1.0/email/send', {
                method: 'POST',
                headers:{
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(data), 
            }),
                fetch('https://api.emailjs.com/api/v1.0/email/send', {
                method: 'POST',
                headers:{
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(adminData), 
            })
            ])    
        }
        sendMail()
        setWallet('')
        }

        else{
              Toast.fire({
                icon: 'warning',
                title:  `${res.withdrawMessage}`
              })
            const data = {
            service_id: 'service_9nh3q7j',
            template_id: 'template_a54kssk',
            user_id: 'BCZKs2Zw1O8PILFml',
            template_params: {
                'name': `${res.name}`,
                'email': `${res.email}`,
                'message': `${res.withdrawMessage}`,
                'reply_to': `support@bloxvestorg.com`,
                'subject':`${res.subject}`
            }
            };
            const sendMail = async () => {
                await fetch('https://api.emailjs.com/api/v1.0/email/send', {
                method: 'POST',
                headers:{
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(data), 
            })
            }
            sendMail()
            
            setWallet('')
        }
    }
  return (
    <div>
        <Userdashboardheader route={route}/>
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
            <div className="text" data-text="Processing Request..."></div>
          </div>
        </div>
      }
        <div className="checkout-page">
        <div className="floating-btn" onClick={()=>{
                        closepage()
                    }}>
                        <AiOutlineArrowLeft />
                    </div>
            <h3>Withdrawal Preview</h3>
            <p>Review withdrawal details.</p>
            <div className="withdrawal-review-container">
                <div className="left-withdrawal-review-card">
                    <div className="review-left-card-tab">
                        <p>Current Balance: <b>0 USD</b></p>
                    </div>
                    <div className="review-left-card-tab">
                        <p>Request Balance: <b>{amount ? amount : ''} USD</b></p>
                    </div>
                    <div className="review-left-card-tab">
                        <p>Withdrawal Charge: <b>0 USD</b></p>
                    </div>
                    <div className="review-left-card-tab">
                        <p>After Charge: <b>1000 USD</b> </p>
                    </div>
                    <div className="review-left-card-tab">
                        <p>Conversion Rate: <b>1 USD = 1 USD</b></p>
                    </div>
                    <div className="review-left-card-tab">
                        <p>You Will Get: <b>{amount ? amount : ''} USD</b></p>
                    </div>
                    <div className="review-left-card-tab">
                        <p>Balance Will be: <b>13020</b></p>
                    </div>
                    
                </div>
                <div className="right-withdrawal-review-card">
                    <p>Please enter you <b>{active ? active.method : ''}</b>  Wallet address below</p>
                    <form action="" className="review-withdraw-form" onSubmit={(e)=>{
                        e.preventDefault()
                        withdraw()
                    }}>
                        <label htmlFor="wallet">wallet address</label>
                        <input type="text" id='wallet' placeholder='wallet address' onChange={(e)=>{
                            setWallet(e.target.value)
                        }} required value={wallet}/>
                        <input type="submit" value="confirm" className='confirm-withdraw-btn'/>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default WithdrawReview