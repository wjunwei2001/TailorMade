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
        <a href="/#">Link1</a>
        <a href="/#">Link2</a>
        <a href="/#">Link3</a>
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