import './Intro.css'

const Intro = () => {
  return (
    <div className="intro-container">
      <img src="https://fontmeme.com/permalink/241228/f9acb8f77c7e50112252244a6d4a0fd8.png"/>
      <br/>
      <span className='color-light'>
        Hi, I am
      </span>{' '}
      <span className='highlight-text'>
        Ashutosh.
      </span>
      <br />
      <div className='color-light'>
        A developer building software solutions for <span className='highlight-description'>Web</span> & <span className='highlight-description'>Android</span>.
        Specially, passionate for <span className='highlight-description'>Embedded Systems</span>, <span className='highlight-description'>Robotics</span> and <span className='highlight-description'>Low Level Programming</span>.
    </div>
    </div>
  )
}

export default Intro
