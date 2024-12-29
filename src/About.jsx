import AboutDescription from "./AboutDescription";
import AboutDetail from "./AboutDetail";
import Nav from './Nav'
import './About.css'
const About = () => {
  return (
    <div className="About">
      <div className="col1">
        <AboutDetail />
      </div>
      <div className="col2">
        <AboutDescription />
      </div>

      <div className='Nav'>
        <Nav />
      </div>

    </div>
  )
}

export default About;
