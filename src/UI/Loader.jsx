import React from 'react'

const DottedLoader = () => {
  return (
    <div className="relative w-16 h-16 animate-spin-slow">
      {[...Array(8)].map((_, i) => {
        const angle = (i * 360) / 8
        const radius = 28 // px from center

        const x = radius * Math.cos((angle * Math.PI) / 180)
        const y = radius * Math.sin((angle * Math.PI) / 180)

        return (
          <span
            key={i}
            className="absolute h-2 w-2 bg-blue-900 rounded-full"
            style={{
              top: `calc(50% + ${y}px - 4px)`,
              left: `calc(50% + ${x}px - 4px)`,
            }}
          ></span>
        )
      })}
    </div>
  )
}

export default DottedLoader
