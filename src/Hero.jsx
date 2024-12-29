import './Hero.css'
import Intro from './Intro'
import Nav from './Nav'
import AnimationCanvas from './AnimationCanvas'
const Hero = () => {
  return (
    <div className='Hero'>
      <div className='space-canvas'>
      <AnimationCanvas/>
      </div>
      <div className='Intro'>
        <Intro />
      </div>
      <div className='Nav'>
        <Nav />
      </div>
    </div>
  )
}

export default Hero
