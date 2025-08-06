import React from 'react'
import bg from '/background/1.webp'
import Button from '../UI/Button'

const IntroPage = () => {
  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat  flex flex-col items-center justify-center text-center px-4 overflow-hidden py-3"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="mb-4">
          <span className="bg-blue-100 text-blue-900 text-sm font-semibold px-4 py-1 rounded-full tracking-wide uppercase">
            Reliable Clean
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-8xl font-semibold text-[#111827] leading-tight tracking-tight">
          Empowering India’s <br />
          Workforce, One Job at a <br />
          Time
        </h1>

        <p className="text-gray-600 text-base md:text-lg mt-6 max-w-lg mx-auto">
          Bharat Workers connects skilled professionals with reliable jobs and
          companies with trusted workers.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button
            title="Hire Now"
            onClick={() => console.log('Hire Now clicked')}
          />
          <Button
            title="Join as Worker"
            onClick={() => console.log('Join as Worker clicked')}
          />
        </div>
      </div>
    </section>
  )
}

export default IntroPage
