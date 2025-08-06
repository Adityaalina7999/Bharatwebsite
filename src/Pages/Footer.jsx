import React from 'react'
import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaLinkedinIn,
  FaYoutube,
} from 'react-icons/fa6'
import { IoCallSharp, IoMailSharp, IoLocationSharp } from 'react-icons/io5'
import logo from '../../public/logo.webp'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-[#161c2d] text-white text-sm py-0 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 py-12 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 ml-8 md:ml-0">
          {/* Logo + About */}
          <div>
            <img src={logo} alt="Bharat Worker" className="w-40 mb-4" />
            <p className="text-white/80 leading-relaxed text-base">
              India’s trusted on-demand workforce platform connecting skilled
              professionals with homes and businesses for cleaning, repair, and
              more.
            </p>
            <div className="flex space-x-4 mt-6 text-lg text-white/80">
              <a href="#">
                <FaFacebookF />
              </a>
              <a href="#">
                <FaInstagram />
              </a>
              <a href="#">
                <FaXTwitter />
              </a>
              <a href="#">
                <FaLinkedinIn />
              </a>
              <a href="#">
                <FaYoutube />
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div className="text-base">
            <h5 className="font-semibold text-white mb-4">Company</h5>
            <ul className="space-y-2 text-white/80">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/services">Services</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
              <li>
                <Link to="#">Join as a Worker</Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="text-base">
            <h5 className="font-semibold text-white mb-4">Our Services</h5>
            <ul className="space-y-2 text-white/80">
              <li>
                <Link to="/services">Construction Workers</Link>
              </li>
              <li>
                <Link to="/services">Plumbers & Electricians</Link>
              </li>
              <li>
                <Link to="/services">Painters & Carpenters</Link>
              </li>
              <li>
                <Link to="/services">Housekeeping & Cleaning Staff</Link>
              </li>
              <li>
                <Link to="/services">Packers & Movers</Link>
              </li>
              <li>
                <Link to="/services">Home Repair & Maintenance</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6 text-base">
            <div>
              <h5 className="font-semibold text-white flex items-center gap-2">
                <IoLocationSharp className="text-yellow-400" /> Visit Our Office
              </h5>
              <p className="text-white/80 mt-1">
                Bharat Workers HQ,
                <br />
                Sector 45, Gurgaon, Haryana – 122003, India
              </p>
            </div>

            <div>
              <h5 className="font-semibold text-white flex items-center gap-2">
                <IoCallSharp className="text-yellow-400" /> Call Us Now
              </h5>
              <p className="text-white/80 mt-1">+91-98765-43210</p>
            </div>

            <div>
              <h5 className="font-semibold text-white flex items-center gap-2">
                <IoMailSharp className="text-yellow-400" /> Send a Message
              </h5>
              <p className="text-white/80 mt-1">support@bharatworkers.in</p>
            </div>
          </div>
        </div>
      </div>

      {/* Subfooter */}
      <div className="bg-[#141a2c] border-t border-white/10 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-white/70 text-sm">
          <span>© 2025 Bharat Workers. All rights reserved.</span>
          <div className="flex gap-4 mt-2 md:mt-0">
            <a href="#" className="hover:underline">
              Terms & Conditions
            </a>
            <a href="#" className="hover:underline">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
