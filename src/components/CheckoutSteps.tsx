import React from 'react'
import { Link } from 'react-router-dom'

interface CheckoutStepsProps {
  step1?: boolean
  step2?: boolean
  step3?: boolean
  step4?: boolean
}

const CheckoutSteps: React.FC<CheckoutStepsProps> = ({
  step1,
  step2,
  step3,
  step4,
}) => {
  return (
    <div className='w-[40%] flex justify-center mb-8 m-auto '>
      <div className='w-1/4'>
        {step1 ? (
          <Link to='/login' className='text-gray-700 hover:text-gray-800'>
            Sign In
          </Link>
        ) : (
          <div className='text-gray-400'>Sign In</div>
        )}
      </div>

      <div className='w-1/4'>
        {step2 ? (
          <Link to='/shipping' className='text-gray-700 hover:text-gray-800'>
            Shipping
          </Link>
        ) : (
          <div className='text-gray-400'>Shipping</div>
        )}
      </div>

      <div className='w-1/4'>
        {step3 ? (
          <Link to='/payment' className='text-gray-700 hover:text-gray-800'>
            Payment
          </Link>
        ) : (
          <div className='text-gray-400'>Payment</div>
        )}
      </div>

      <div className='w-1/4'>
        {step4 ? (
          <Link to='/placeorder' className='text-gray-700 hover:text-gray-800'>
            Place Order
          </Link>
        ) : (
          <div className='text-gray-400'>Place Order</div>
        )}
      </div>
    </div>
  )
}

export default CheckoutSteps
