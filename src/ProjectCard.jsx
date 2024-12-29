import React from 'react'
import './ProjectCard.css'
import { Link } from 'react-router-dom'

const ProjectCard = ({ name, startDate, endDate, img, domain, language, description, ghLink }) => {
  return (
    <div className='card'>
      <Link to={ghLink} target='_blank' className='card-secondary-color'>
      <div className='title'>{name}</div>
      <div className='card-des'>{description}</div>
      <div ><img src={img} className='gif' alt='Please wait. Loading..'/></div>
      <div className='flex-box'>
        <div className='flex-child domain'>{domain}</div>
        <div className='flex-child date'>{`${startDate}-${endDate}`}</div>
        <div className='flex-child lang'>{language}</div>
      </div>
      </Link>
    </div>
  )
}

export default ProjectCard
