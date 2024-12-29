import React from 'react'
import './AboutDetail.css'
const AboutDetail = () => {
  const points = [
    'Embedded Systems & Robotics',
    'Full Stack Development',
    'Desktop App Development (with both C/C++ & JS frameworks )',
    'Computer Graphics (mostly OpenGL & WebGL)',
    'GPGPU Computation (with frameworks like OpenAL & CUDA)',
    'DNN/CNN with good grip on data/image processing (preferrably in Python or C++)',
    'Game Development (basic level 3D in Unity Engine & 2D with or without any engine)'
  ]
  return (
    <div className='about-detail'>
      <div className='list-item'>
      I am passionate developer, enjoying all sorts of coding. Rather than learning and relying on high-level frameworks, I like to go deep and build from ground up, where necessary.
        <br/>
        In my last few years at college, I have explored multiple desciplines of CSE. They are listed below (order is irrelevant):
      </div>
      <ol>
      {points.map((point, index)=>{
        return(
          <li id={index} className='list-item'>{point}</li>
        )
      })}
      </ol>
    </div>
  )
}

export default AboutDetail
