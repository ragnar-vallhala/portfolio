import Nav from './Nav'
import ProjectCard from './ProjectCard'
import './Projects.css'
import projectList from './projectlist'
const Projects = () => {
  return (
    <div className='Projects'>
      <div className='container'>
        {projectList.map((item, index) => (
          <ProjectCard 
            key={index} // Add a unique key for each item
            id={index}
            name={item.name}
            startDate={item.startDate}
            endDate={item.endDate}
            img={item.img}
            domain={item.domain}
            language={item.language}
            description={item.description}
            ghLink={item.ghLink}
          />
        ))}
      </div>
      <div className='Nav'>
        <Nav />
      </div>
    </div>
  )
}

export default Projects;
