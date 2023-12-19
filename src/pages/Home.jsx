import React from 'react'
import Landpage from '../components/Landpage/Landpage'
import Why from '../components/why/Why'
import Plan from '../components/plans/Plan'
import About from '../components/about/About'
import Feature from '../components/feature/Feature'
import Roadmap from '../components/roadmap/Roadmap'
import Faq from '../components/Faq/Faq'
import Review from '../components/review/Review'
import Contact from '../components/contact/Contact'
import Footer from '../components/footer/Footer'
const Home = () => {
  return (
    <main className='home-img'>
        <Landpage />
        <Why />
        <Plan />
        <About />
        {/* <Roadmap /> */}
        <div className="home-price-chart-section">
              <iframe src="https://widget.coinlib.io/widget?type=chart&theme=light&coin_id=859&pref_coin_id=1505" style={{width:"100%",height:"536px",scrolling:"none",marginWidth:"0",marginHeight:"0", frameBorder:"0", border:"0",lineHeight: '14px'}}></iframe>
        </div>
        <Feature />
        <Review />
        <Faq />
        <div className="foot-contact-wrapper">
        <Contact />
        <Footer />
      </div> 
    </main>
  )
}

export default Home