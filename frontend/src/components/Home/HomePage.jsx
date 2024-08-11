import React from 'react';
import iphone from '../../assets/iphone-14-pro.webp';
import mac from '../../assets/mac-system-cut.jfif';
import './HomePage.css';
import HeroSection from './HeroSection';
import FeaturedProducts from './FeaturedProducts';


const HomePage = () => {
  return (
    <div>
        <HeroSection title="Buy iphone 14 pro" subtitle="Experience the power of latest iphone 14 with most pro camera ever"
            link="/product/66ad095ab41f49410646358e" image={iphone}/>
        <FeaturedProducts/>
        <HeroSection title="Build the ultimate setup" subtitle="You can add studio display and color-matched magic accessories"
            link="/product/66ad095ab41f494106463596" image={mac}/>
    </div>
  )
}

export default HomePage