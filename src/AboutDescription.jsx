import React from 'react'
import './AboutDescription.css'
const AboutDescription = () => {
  return (
    <div className='about-description'>
      <div className='picture'>
        <img src='/me.png' className='image' />
      </div>
      <div className='description'>
        <img src="https://img.shields.io/badge/B.Tech%20Computer%20Science%20&%20Engineering-4e6889" alt="Degree Badge" />
        <img src="https://img.shields.io/badge/IIT%20Jammu-f5efe7" alt="Institute Badge" />      </div>
    </div>
  )
}

export default AboutDescription
