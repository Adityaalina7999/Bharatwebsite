import React, { useState, useEffect, useRef } from 'react'
import logoblack from '../../public/logo-black.webp'
import Button from '../UI/Button'
import { Menu, X, User } from 'lucide-react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [showNavbar, setShowNavbar] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const menuRef = useRef(null)

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Hide navbar on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > lastScrollY && currentScrollY > 60) {
        setShowNavbar(false)
      } else {
        setShowNavbar(true)
      }
      setLastScrollY(currentScrollY)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return (
    <header
      className={`bg-white py-3 px-4 sm:px-8 lg:px-16 sticky top-0 z-50 transition-transform duration-300 ${
        showNavbar ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <a href="/" className="flex items-center space-x-2">
          <img
            src={logoblack}
            alt="Bharat Worker Logo"
            className="h-10 sm:h-12"
          />
        </a>

        {/* Hamburger Menu (Mobile + Tablet) */}
        <div className="lg:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex space-x-8 text-gray-800 font-medium">
          <Link to="/" className="hover:text-blue-600">
            Home
          </Link>
          <Link to="/services" className="hover:text-blue-600">
            Services
          </Link>
          <Link to="/how-it-works" className="hover:text-blue-600">
            How It Works
          </Link>
          <Link to="/about" className="hover:text-blue-600">
            About
          </Link>
          <Link to="/contact" className="hover:text-blue-600">
            Contact
          </Link>
        </nav>

        {/* Right Side (Desktop) */}
        <div className="hidden lg:flex items-center space-x-6">
          <div className="text-center text-sm">
            <p className="text-gray-500 text-xs font-medium">Need Help?</p>
            <h5 className="text-blue-950 font-semibold text-lg">
              +91 98765 43210
            </h5>
          </div>
          <Button
            title="Download App"
            onClick={() => alert('Download clicked')}
          />
          <Link
            to="/registration"
            className="flex items-center justify-center bg-blue-950 text-white p-2 rounded-md hover:bg-blue-800 transition-all"
          >
            <User size={18} />
          </Link>
        </div>
      </div>

      {/* Mobile + Tablet Sidebar */}
      {menuOpen && (
        <div
          ref={menuRef}
          className="lg:hidden bg-white absolute top-full left-0 w-full shadow-md py-4 px-6 space-y-4 z-40"
        >
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="block text-gray-800 hover:text-blue-600"
          >
            Home
          </Link>
          <Link
            to="/services"
            onClick={() => setMenuOpen(false)}
            className="block text-gray-800 hover:text-blue-600"
          >
            Services
          </Link>
          <Link
            to="/how-it-works"
            onClick={() => setMenuOpen(false)}
            className="block text-gray-800 hover:text-blue-600"
          >
            How It Works
          </Link>
          <Link
            to="/about"
            onClick={() => setMenuOpen(false)}
            className="block text-gray-800 hover:text-blue-600"
          >
            About
          </Link>
          <Link
            to="/contact"
            onClick={() => setMenuOpen(false)}
            className="block text-gray-800 hover:text-blue-600"
          >
            Contact
          </Link>

          {/* Help + Actions */}
          <div className="pt-2 border-t space-y-2">
            <p className="text-gray-500 text-sm">Need Help?</p>
            <h5 className="text-blue-600 font-semibold mb-2 text-sm sm:text-base">
              +91 98765 43210
            </h5>
            <div className="flex items-center gap-4 pt-2">
              <Button
                title="Download App"
                onClick={() => alert('Download clicked')}
              />
              <Link
                to="/registration"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 bg-blue-950 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition-all"
              >
                <User size={18} /> <span>Login</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
