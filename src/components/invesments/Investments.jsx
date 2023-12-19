import React from 'react'
import { useState,useEffect } from 'react'
import { useNavigate,Link } from 'react-router-dom'
import Userdashboardheader from '../userdashboardheader/Userdashboardheader'
const Investments = ({route}) => {

  
  const navigate = useNavigate()
  const [userData, setUserData] = useState()
  const [loader,setLoader] = useState(false)

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
            <div className="text" data-text="login in..."></div>
          </div>
        </div>
      }
      {userData && userData.invest.length !== 0 ? 
      <div className="page-swiper-wrapper">
      <div className="page-header">
          <h3>checkout your investment logs</h3>
          <h2>Investment logs</h2>
          <p>we keep track of all your invesments</p>
      </div>
      <div className="transaction-container no-ref">
        <table>
            <thead>
              <tr>
                <td>amount</td>
                <td>plan</td>
                <td>started</td>
                <td>to end</td>
                <td>total profit</td>
              </tr>
            </thead>
            <tbody>
              {
                userData.invest.map(refer =>
                  <tr>
                    <td>${refer.amount} USD</td>
                    <td>{refer.plan}</td>
                    <td>{refer.startDate}</td>
                    <td>{refer.endDate}</td>
                    <td>${refer.profit} USD</td>
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
        <p>You have not invested yet. Click the button below to make your first investment</p>
        <Link to='/fundwallet'>invest</Link>
      </div>
      </div>
      }
     
</div>
  )
}

export default Investments