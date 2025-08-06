import React from 'react'
import CountUp from 'react-countup'
import { useInView } from 'react-intersection-observer'

const stats = [
  { label: 'Skilled Workers Registered', value: 12500 },
  { label: 'Jobs Completed', value: 28000 },
  { label: 'Cities Covered', value: 50 },
  { label: 'Trusted Employers', value: 1200 },
]

const Counters = () => {
  const { ref, inView } = useInView({ triggerOnce: true })

  return (
    <div
      ref={ref}
      className="flex flex-wrap sm:flex-row flex-col justify-center gap-16 px-4 py-14 mx-4 md:mx-20 rounded-xl bg-yellow-400"
    >
      {stats.map((item) => (
        <div key={item.label} className="text-center">
          <div className="text-4xl font-bold text-gray-900 mb-2">
            {inView ? (
              <CountUp end={item.value} duration={2} separator="," />
            ) : (
              0
            )}
            +
          </div>
          <div className="text-sm font-normal text-gray-500 max-w-[200px] mx-auto">
            {item.label}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Counters
