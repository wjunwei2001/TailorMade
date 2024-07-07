import { useRef } from 'react'
import { FaBars, FaTimes } from "react-icons/fa";
import "../styles/Navbar.css"

function Navbar() {
  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  } 

  return (
    <header>
      <a href="/" className='app-name'>
        <h3 >TailorMade</h3>
      </a>
      <nav ref={navRef}>
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/#">Our Recommendations</a>
        <button className="nav-btn nav-close-btn" onClick={showNavbar}>
          <FaTimes />
        </button>
      </nav>
      <button className="nav-btn" onClick={showNavbar}>
        <FaBars />
      </button>
    </header>
  )
}

export default Navbar;