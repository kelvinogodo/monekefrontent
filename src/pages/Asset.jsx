import React, { useState } from 'react'
import {RiStockLine} from 'react-icons/ri'
import {FaTractor} from 'react-icons/fa'
import {AiTwotoneBank} from 'react-icons/ai'
import {GiHouse,GiOilPump} from 'react-icons/gi'
import {SiBitcoin} from 'react-icons/si'
import {BsCheckSquare} from 'react-icons/bs'
import { AnimatePresence,motion } from 'framer-motion'
import {GiChart} from 'react-icons/gi'

const Asset = () => {
    const [tabs,setTabs] = useState([
        {
            id:1,
            title:'Forex',
            content:'we are here again',
            header:'forex and arbitrage trading',
            body:[
            "Get access to cryptocurrencies, stocks, bonds & CDs, options, non-proprietary mutual funds, futures, forex, commission-free ETFs*, and more to stay diversified and ready to take advantage of a wider range of opportunities Currently, we offer the greatest number of markets among investment management companies in the industry. The majority of our investment products are backed by blockchain technology, while a substantial amount of them are crypto-based assets"],
            active:true,
            icon:GiChart,
            bg:'How-Citizenship-by-Investment-Unlocks-the-Potential-of-Cryptocurrency.webp'
        },
        {
            id:2,
            title:'Crypto',
            content:'we are here again',
            header:'crypto currency and NFTs',
            body:[
                "Get access to cryptocurrencies, stocks, bonds & CDs, options, non-proprietary mutual funds, futures, forex, commission-free ETFs*, and more to stay diversified and ready to take advantage of a wider range of opportunities Currently, we offer the greatest number of markets among investment management companies in the industry. The majority of our investment products are backed by blockchain technology, while a substantial amount of them are crypto-based assets"],
            active:false,
            icon:SiBitcoin,
            bg:'Which-Type-of-Investment-Has-the-Highest-Risk.jpg'
        },
        {
            id:3,
            title:'Real Estate',
            content:'we are here again',
            header:'real estate and housing',
            body:[
                "Get access to cryptocurrencies, stocks, bonds & CDs, options, non-proprietary mutual funds, futures, forex, commission-free ETFs*, and more to stay diversified and ready to take advantage of a wider range of opportunities Currently, we offer the greatest number of markets among investment management companies in the industry. The majority of our investment products are backed by blockchain technology, while a substantial amount of them are crypto-based assets"],
            active:false,
            icon:GiHouse,
            bg:'model-house-money-real-estate-investment-model-house-money-real-estate-investment-concept-131286610.jpg'
        },
        {
            id:4,
            title:'Oil',
            content:'we are here again',
            header:'crude oil investment',
            body:[
                "Get access to cryptocurrencies, stocks, bonds & CDs, options, non-proprietary mutual funds, futures, forex, commission-free ETFs*, and more to stay diversified and ready to take advantage of a wider range of opportunities Currently, we offer the greatest number of markets among investment management companies in the industry. The majority of our investment products are backed by blockchain technology, while a substantial amount of them are crypto-based assets"],
            active:false,
            icon:GiOilPump,
            bg:'original_imageshttpsg.foolcdn.comeditorialimag.width-880_py99TiM.webp'
        },
        {
            id:5,
            title:'Agriculture',
            content:'we are here again',
            header:'argro -tech investment',
            body:[
                "Get access to cryptocurrencies, stocks, bonds & CDs, options, non-proprietary mutual funds, futures, forex, commission-free ETFs*, and more to stay diversified and ready to take advantage of a wider range of opportunities Currently, we offer the greatest number of markets among investment management companies in the industry. The majority of our investment products are backed by blockchain technology, while a substantial amount of them are crypto-based assets"],
            active:false,
            icon:FaTractor,
            bg:'Invest4Land-Agriculture-Real-Estate-Investment-Investing-Farmland-Farming-Agrobusiness-Investor-Property-Managed-Farmland-Turkey-Spain-Almond-Walnut0.jpg'
        },
    ])

    const changeContent =(id)=>{
        setTabs(tabs.map(tab => (tab.id === id ? {...tab,active:true} : {...tab,active:false})))
        console.log(tabs)
    }
  return (
    <div className='roadmap-section'>
    <div className="why-choose-us-text-container">
        <div className="header" data-aos="fade-up">
            <span className="header-line"></span>
            <h2>our multi-million dollar assets</h2>
        </div>
        <h1 data-aos="fade-up">industries we invest in</h1>
        <p data-aos="fade-up">
        Here are our major investments from which we build investors' profits. These investments and their underlying assets were carefully selected, using high-end fundamental and technical analysis.
        </p>
    </div>
    <div className="roadmap-container" data-aos="fade-up" >
        <div className="widget-container">
            {
                tabs.map(tab =>
                    // <li className={`icon facebook ${tab.active === true ? 'my-active-tab' : ''}`} onClick={()=>{changeContent(tab.id)}}>
                    //     <span className="tooltip" key={tab.id} >{tab.title}</span>
                    //     <span><tab.icon /></span>
                    // </li>
                    <div className={`widget-tab ${tab.active === true ? 'show-line' : ''}`} onClick={()=>{changeContent(tab.id)}}>
                        <p>{tab.title}</p>
                        <span className="widget-line"></span>
                    </div>
                )
            }
        </div>
        <motion.div className="tab-content asset-content" layout animate={{opacity:1}} initial={{opcaity:0}} exit={{opacity:0}}>
        <AnimatePresence>
            {
                tabs.map(tab => tab.active === true &&
                    <>
                    <motion.div className="tab-text" >
                        <h2>
                            {tab.header}
                        </h2>
                        <span className='thin-line'></span>
                        <ul>
                            {tab.body.map(list => <li>{list}</li>)}
                        </ul> 
                    </motion.div>
                    <motion.div className="tab-img-container">
                        <img src={`${tab.bg}`} alt="" />
                    </motion.div> 
                    </>
                )
            }
        </AnimatePresence>
        </motion.div>
    </div>
</div>
  )
}

export default Asset