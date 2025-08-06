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

const router = createBrowserRouter([
  {
    path: '',
    element: <App />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'About',
        element: <About />,
      },
      {
        path: 'Contact',
        element: <Contact />,
      },
      {
        path: 'Services',
        element: <Services />,
      },
      {
        path: 'how-it-works',
        element: <Howitworks />,
      },
      {
        path: 'Book-repair',
        element: <BookRepair />,
      },
      {
        path: 'registration',
        element: <RegistrationMethod />,
      },
      {
        path: 'PhoneLoginPage',
        element: <PhoneLoginPage />,
      },
      {
        path: 'OtpVerificationPage',
        element: <OtpVerificationPage />,
      },
      {
        path: 'AboutYouForm',
        element: (
          <RegistrationProvider>
            <RegistrationFlow />
          </RegistrationProvider>
        ),
      },
    ],
  },
])

export default router
