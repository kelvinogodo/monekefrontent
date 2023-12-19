import React from 'react'
import './plan.css'
import { useState } from 'react'
import {RxDash} from 'react-icons/rx'
import { useNavigate } from 'react-router-dom'
const Plan = () => {
    const navigate = useNavigate()
    const [withdrawMethods,setWithdrawalMethods] = useState([
        {
          id:1,
          min:300,
          max:4999,
          image:'/btc.png',
          method:'BTC',
          type:'basic plan',
          percent:'8%'
        },
        {
          id:2,
          min:5000,
          max:9999,
          image:'/bnb.png',
          method:'USDT',
          type:'mega plan',
          percent:'10%'
        },
        {
          id:3,
          min:10000,
          max:29999,
          image:'/tron.png',
          method:'tether(TRC20)',
          type:'ultra plan',
          percent:'16%'
        },
        {
          id:4,
          min:30000,
          max:59999,
          image:'/tron.png',
          method:'tether(TRC20)',
          type:'vip plan',
          percent:'24%'
        },
        {
          id:5,
          min:60000,
          max:99999,
          image:'/tron.png',
          method:'tether(TRC20)',
          type:'premium plan',
          percent:'30%'
        },
        {
          id:6,
          min:100000,
          max:500000,
          image:'/tron.png',
          method:'tether(TRC20)',
          type:'ultimate plan',
          percent:'50%'
        },
      ])
  return (
    <div className='plan-section'>
        <div className="why-choose-us-text-container">
            <div className="header" data-aos="fade-up">
                <span className="header-line"></span>
                <h2>our plans</h2>
            </div>
            <h1 data-aos="fade-up">choose an investment plan</h1>
            <p data-aos="fade-up">choose an investment plan of your choice, but remember , the bigger the investment the bigger the return</p>
        </div>
        <div className="plan-card-container">
        {
                withdrawMethods.map((withdrawmethod) => (
                  <div key={withdrawmethod.id} className='my-plan-container' data-aos="fade-up">
                  <div className="crypto-card-img-container dashboard-plan-card-header">
                    <h3>{withdrawmethod.type}</h3>
                    <div className="plan-card-headerdiv">
                      <span className="small-plan-head">
                        <h3>{withdrawmethod.percent}</h3>
                        <p>weekly</p>
                      </span>
                      <span className="small-plan-head">
                        <h3>pay</h3>
                        <p>off</p>
                      </span>
                    </div>
                  </div>
                  <div className="investrange-container investcard-cont">
                      <div className="investrange-card invest-card">
                        <p>minimum deposit</p>
                        <RxDash />
                        <p>$ {withdrawmethod.min} USD</p>
                      </div>
                      <div className="investrange-card invest-card">
                        <p>maximum deposit</p>
                        <RxDash />
                        <p>$ {withdrawmethod.max} USD</p>
                      </div>
                      <div className="investrange-card invest-card">
                        <p>capital return</p>
                        <RxDash />
                        <p>{withdrawmethod.percent}</p>
                      </div>
                      <div className="investrange-card invest-card">
                        <p>total return</p>
                        <RxDash />
                        <p> {withdrawmethod.percent}</p>
                      </div>
                    </div>
                    <button className="deposit-btn" onClick={()=>{
                        navigate('/login')
                    }}>choose plan</button>
                    </div>
                  ))}
        </div>
    </div>
  )
}

export default Plan