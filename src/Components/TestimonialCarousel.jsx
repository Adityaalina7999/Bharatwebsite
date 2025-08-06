import React from 'react'
import Slider from 'react-slick'
import { FaStar } from 'react-icons/fa'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
// Create this for custom dots styling
import img from '../../public/testimonial/1.jpg'
import img1 from '../../public/testimonial/2.jpg'
import img2 from '../../public/testimonial/3.jpg'
import img3 from '../../public/testimonial/4.jpg'
import img4 from '../../public/testimonial/5.jpg'
import img5 from '../../public/testimonial/6.jpg'
import img6 from '../../public/testimonial/7.jpg'
import img7 from '../../public/testimonial/8.jpg'

const testimonials = [
  {
    id: 1,
    name: 'Neha S.',
    photo: img,
    rating: 5,
    comment:
      'I was impressed by how quickly they responded and the job was done perfectly. Definitely booking again!',
  },
  {
    id: 2,
    name: 'Ravi P.',
    photo: img1,
    rating: 5,
    comment:
      '"Great experience! The worker arrived on time and did a fantastic cleaning job. Very professional service."',
  },
  {
    id: 3,
    name: 'Divya R.',
    photo: img2,
    rating: 5,
    comment:
      '"Booking through the app was simple. The service was neat, safe, and affordable. Highly recommended!"',
  },
  {
    id: 4,
    name: 'Amit T.',
    photo: img3,
    rating: 5,
    comment:
      '"Excellent support team and very polite workers. Got my plumbing issue fixed in one visit."',
  },
  {
    id: 5,
    name: 'Sneha J.',
    photo: img4,
    rating: 5,
    comment:
      '"Very reliable and trustworthy service. I use them monthly for my office cleaning needs."',
  },
  {
    id: 6,
    name: 'Manoj K.',
    photo: img5,
    rating: 5,
    comment:
      '"Affordable pricing and no hidden costs. Bharat Workers makes home cleaning stress-free and convenient."',
  },
  {
    id: 7,
    name: 'Payal D.',
    photo: img6,
    rating: 5,
    comment:
      '"Booked a deep clean and the results were beyond expectations. The workers were punctual and efficient."',
  },
  {
    id: 8,
    name: 'Suresh M.',
    photo: img7,
    rating: 5,
    comment:
      '"I feel safe using their services. All workers are verified and well-trained."',
  },
]

const TestimonialCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
    appendDots: (dots) => <ul className="custom-dots">{dots}</ul>,
  }

  return (
    <div className="sm:px-16  py-12 overflow-hidden">
      <div className="bg-blue-50 text-blue-800 rounded-full px-4 py-1 w-fit mx-auto mb-4 text-sm font-semibold tracking-widest">
        TESTIMONIALS
      </div>

      <h2 className="text-4xl font-semibold text-center mb-10 text-gray-800">
        Our Happy Customers
      </h2>

      <Slider {...settings}>
        {testimonials.map((item) => (
          <div key={item.id} className="sm:p-4 p-1">
            <div className="flex flex-col items-left text-left rounded-lg p-6   transition duration-300">
              <img
                src={item.photo}
                alt={item.name}
                className="w-20 h-20 rounded-lg object-cover mb-4"
              />
              <h3 className="text-lg font-semibold mb-1">{item.name}</h3>
              <div className="flex text-yellow-500 mb-3">
                {Array(item.rating)
                  .fill()
                  .map((_, i) => (
                    <FaStar key={i} />
                  ))}
              </div>
              <p className="text-lg text-gray-400">{item.comment}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default TestimonialCarousel
