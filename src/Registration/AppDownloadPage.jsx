import React from 'react'
import { FaDownload, FaQrcode } from 'react-icons/fa'
import { SiGoogleplay } from 'react-icons/si'

const AppDownloadPage = () => {
  // Replace with your actual Play Store URL
  const playStoreUrl = "https://play.google.com/store/apps/details?id=com.bharatworker.app"
  
  const handleDownloadClick = () => {
    window.open(playStoreUrl, '_blank')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col items-center justify-center px-4">
      <div className="max-w-4xl w-full mx-auto text-center">
        
        {/* Header Message */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            To Login to Your Account
          </h1>
          <h2 className="text-xl md:text-2xl font-semibold text-blue-600 mb-2">
            Download Our Mobile App
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Get the full Bharat Worker experience on your mobile device. Access all features, manage your profile, and find jobs on the go.
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            
            {/* Left Side - Logo */}
            <div className="flex flex-col items-center">
              <div className="bg-white p-6 rounded-full shadow-lg mb-6">
                <img 
                  src="/logo-black.webp" 
                  alt="Bharat Worker Logo" 
                  className="w-24 h-24 md:w-32 md:h-32 object-contain"
                />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Bharat Worker
              </h3>
              <p className="text-gray-600 text-center">
                Your trusted platform for skilled jobs and career growth
              </p>
            </div>

            {/* Right Side - QR Code & Download */}
            <div className="flex flex-col items-center">
              
              {/* QR Code Placeholder */}
              <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl p-8 mb-6 w-48 h-48 flex items-center justify-center">
                <div className="text-center">
                  <FaQrcode className="text-6xl text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500 text-sm">
                    QR Code for<br />Play Store Download
                  </p>
                </div>
              </div>

              <p className="text-gray-600 text-sm mb-4">
                Scan QR code to download
              </p>

              {/* Download Button */}
              <button
                onClick={handleDownloadClick}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full font-semibold text-lg flex items-center gap-3 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                <SiGoogleplay className="text-2xl" />
                Download from Play Store
              </button>

              {/* Alternative Download Link */}
              <a 
                href={playStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 text-blue-600 hover:text-blue-800 underline text-sm"
              >
                Or click here to open Play Store
              </a>
            </div>
          </div>

          {/* Features Section */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h4 className="text-xl font-semibold text-gray-900 mb-6">
              Why Download Our App?
            </h4>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <FaDownload className="text-blue-600" />
                </div>
                <h5 className="font-semibold text-gray-900 mb-2">Easy Access</h5>
                <p className="text-gray-600 text-sm">
                  Quick login and seamless experience
                </p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                </div>
                <h5 className="font-semibold text-gray-900 mb-2">Better Experience</h5>
                <p className="text-gray-600 text-sm">
                  Optimized for mobile usage
                </p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <h5 className="font-semibold text-gray-900 mb-2">All Features</h5>
                <p className="text-gray-600 text-sm">
                  Complete access to all app features
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            Available on Android devices • Free download • No subscription required
          </p>
        </div>
      </div>
    </div>
  )
}

export default AppDownloadPage