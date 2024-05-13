import './App.css';
import { Profiler, useEffect } from 'react';
import { motion,AnimatePresence } from 'framer-motion';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import Login from './pages/Login'
import Home from './pages/Home';
import AOS from 'aos'
import 'aos/dist/aos.css'
import Swal from 'sweetalert2';
import Signup from './pages/Signup';
import Userdashboard from './pages/Userdashboard'
import Userdashboardfundaccount from './components/userdashboardfundaccount/Userdashboardfundaccount'
import Userdashboardwithdraw from './components/userdashboardwithdraw/Userdashboardwithdraw';
import Userdashboardreferrals from './components/userdashboardreferrals/Userdashboardreferrals';
import Userdashboardplans from './components/userdashboardplans/Userdashboardplans';
import Userdashboardtransactions from './components/userdashboardtransactions/Userdashboardtransactions';
import Investments from './components/invesments/Investments';
import Profile from './components/profile/Profile'
import VerifyEmail from './pages/VerifyEmail';
import WithdrawalLogs from './components/WithdrawalLogs';
import Checkout from './components/Checkout';
import Admindashboard from './components/admindashboard/Admindashboard';
import Deposit from './components/deposit/Deposit';
import Viplan from './components/viplan/Viplan';
function App() {

    useEffect(() => {
    AOS.init({
      offset: 60,
      duration: 500,
      easing: 'ease-in-sine',
      delay: 100
    })
      AOS.refresh()
    // duration=1200;
    }, [])

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
    const myArray = [
      {
        country: 'pakistan',
        amount:'$1000'
      },
      {
        country: 'Australia',
        amount:'$5700'
      },
      {
        country: 'USA',
        amount:'$10000'
      },
      {
        country: 'Kuwait',
        amount:'$720'
      },
      {
        country: 'Norway',
        amount:'$3200'
      },
      {
        country: 'Brazil',
        amount:'$8500'
      },
    ]
    const num = myArray.length-1
    setInterval(() => {
      Toast.fire({
              icon: 'success',
              title: `An Investor from ${myArray[Math.floor(Math.random() * num)].country} just withdrew ${myArray[Math.floor(Math.random() * num)].amount}...`
            })
    }, 30000);
  
    const route = 'https://bloxvest.onrender.com'
  return (
    <>
    <AnimatePresence>
        <Router>
        <motion.div className="App"
        key={Routes.Route}
        initial="initialState"
        animate="animateState"
        exit="exitState"
        transition={{duration:0.2}}
        variants={{
          initialState:{
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
          },
          animateState:{
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
          },
          exitState:{
            clipPath: "polygon(50% 0, 50% 0, 50% 100%, 50% 100%)",
          }
        }}
        >
          <Routes>
            <Route path='/' element={<Home />}/>
              <Route path='/login' element={<Login route={route} />}/>
            <Route path='/signup' element={<Signup route={route}/>}/>
            <Route path='/dashboard' element={<Userdashboard route={route}/>}/>
            <Route path='/fundwallet' element={<Userdashboardfundaccount route={ route}/>}/>
            <Route path='/referrals' element={<Userdashboardreferrals route={ route}/>}/>
            <Route path='/withdraw' element={<Userdashboardwithdraw route={ route}/>}/>
            <Route path='/plans' element={<Userdashboardplans route={route}/>}/>
            <Route path='/transactions' element={<Userdashboardtransactions route={ route}/>}/>
            <Route path='/investments' element={<Investments route={ route}/>}/>
            <Route path='/myprofile' element={<Profile route={route}/>}/>
            <Route path='/users/:id/verify/:token' element={<VerifyEmail route={ route}/>}/>
            <Route path='/withdrawlogs' element={<WithdrawalLogs route={ route}/>}/>
            <Route path='/checkout' element={<Checkout />}/>
            <Route path='/admin' element={<Admindashboard route={ route}/>}/>
            <Route path='/deposit' element={<Deposit />}/>
            <Route path='/promoplan' element={<Viplan route={route}/>}/>
          </Routes>
        </motion.div>
      </Router>
    </AnimatePresence>
    <div className="iframe-container">
      <iframe src="https://widget.coinlib.io/widget?type=horizontal_v2&amp;theme=dark&amp;pref_coin_id=1505&amp;invert_hover=" width="100%" height="36" scrolling="auto" marginWidth="0" marginHeight="0" frameborder="0" border="0" style={{border:0,margin:0,padding:0,}}>
      </iframe>
    </div>
    </>
  );
}

export default App;