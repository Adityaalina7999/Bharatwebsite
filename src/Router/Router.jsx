import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../Pages/Home'
import About from '../Pages/About'
import Services from '../Pages/Services'
import Contact from '../Pages/Contact'
import Howitworks from '../Pages/Howitworks'
import BookRepair from '../Components/BookRepair'
import RegistrationMethod from '../Registration/RegistrationMethod'
import PhoneLoginPage from '../Registration/PhoneLoginPage'
import OtpVerificationPage from '../Registration/OtpVerificationPage'
import AboutYouForm from '../Registration/Registration'
import RegistrationFlow from '../Registration/RegistrationFlow'
import { RegistrationProvider } from '../Registration/RegistrationContext/RegistrationContext'
import GoogleSinpuppage from '../Registration/GoogleSinpuppage'
import AppDownloadPage from '../Registration/AppDownloadPage'
const router = createBrowserRouter([
  {
    path: '',
    element: (
      <RegistrationProvider>
        <App />
      </RegistrationProvider>
    ),
    children: [
      { path: '', element: <Home /> },
      { path: 'About', element: <About /> },
      { path: 'Contact', element: <Contact /> },
      { path: 'Services', element: <Services /> },
      { path: 'how-it-works', element: <Howitworks /> },
      { path: 'Book-repair', element: <BookRepair /> },
      { path: 'registration', element: <RegistrationMethod /> },
      { path: 'PhoneLoginPage', element: <PhoneLoginPage /> },
      { path: 'GoogleSinpuppage', element: <GoogleSinpuppage /> },

      { path: 'OtpVerificationPage', element: <OtpVerificationPage /> },
      { path: 'AboutYouForm', element: <RegistrationFlow /> },
      { path: 'AppDownloadPage', element: <AppDownloadPage /> },
    ],
  },
])

export default router
