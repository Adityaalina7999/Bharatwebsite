import React from 'react'
import { Outlet } from 'react-router-dom'

import Navbar from './Pages/Navbar'
import Footer from './Pages/Footer'
import ScrollProgress from './UI/ScrollProgress' // adjust path if needed
import ScrollToTop from './ScrollToTop/ScrollToTop'
const App = () => {
  return (
    <div>
      <ScrollToTop />
      <Navbar />
      <div className="hidden sm:flex">
        <ScrollProgress />
      </div>
      <Outlet />
      <Footer />
    </div>
  )
}

export default App
