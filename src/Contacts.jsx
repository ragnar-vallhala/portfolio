import './Contacts.css';
import Nav from './Nav';

const Contacts = () => {
  return (
    <div className='Developer'>
      <h1>Contact Me</h1>
      <div className='links'>
        <a href="https://github.com/ragnar-vallhala" target="_blank" rel="noreferrer" className='arrange'>
          <img src='/github.png' className='c-image' alt='GitHub' />
        </a>
        <a href="https://www.linkedin.com/in/ashutosh-vishwakarma-083305257/" target="_blank" rel="noreferrer" className='arrange'>
          <img src='/linkedin.png' className='c-image' alt='LinkedIn' />
        </a>
        <a href="https://www.instagram.com/7__v.ashu__7/" target="_blank" rel="noreferrer" className='arrange'>
          <img src='/instagram.png' className='c-image' alt='Instagram' />
        </a>
        <a href="mailto:ashutoshvishwakarma208@gmail.com" target="_blank" rel="noreferrer" className='arrange'>
          <img src='/mail.png' className='c-image' alt='Mail' />
        </a>
        <a href="https://github.com/ragnar-vallhala/shader-fun/issues" target="_blank" rel="noreferrer" className='arrange'>
          <img src='/bug.png' className='c-image' alt='Report Issue' />
        </a>
      </div>
      <div className='Nav'>
        <Nav />
      </div>
    </div>
  );
};

export default Contacts;

