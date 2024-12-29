import './App.css'
import Hero from './Hero'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Projects from './Projects';
import Contacts from './Contacts';
import About from './About';
import NotFound from './NotFound';
function App() {
  const width = window.innerWidth;
  if (width < 1280) {
    alert("Open the website as Desktop Site for better experience.");
  }
  return (
    <Router classname='App'>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
