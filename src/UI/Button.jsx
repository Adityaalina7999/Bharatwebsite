import React from 'react'

const Button = ({ title, onClick }) => {
  return (
    <>
      <div
        className="bg-blue-900 text-white px-5 py-2.5 rounded-full font-medium hover:bg-blue-800 hover:shadow-lg hover:shadow-cyan-500 transition"
        onClick={onClick}
      >
        {title}
      </div>
    </>
  )
}

export default Button
