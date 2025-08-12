import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ScrollToTop = () => {
  const location = useLocation()

  useEffect(() => {
    // Instantly jump to top
    window.scrollTo(0, 0)
  }, [location.pathname])

  return null
}

export default ScrollToTop
