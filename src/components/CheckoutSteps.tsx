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
    <div className='flex justify-center mb-8'>
      <div className='w-1/4'>
        {step1 ? (
          <Link to='/login' className='text-blue-500 hover:text-blue-700'>
            Sign In
          </Link>
        ) : (
          <div className='text-gray-400'>Sign In</div>
        )}
      </div>

      <div className='w-1/4'>
        {step2 ? (
          <Link to='/shipping' className='text-blue-500 hover:text-blue-700'>
            Shipping
          </Link>
        ) : (
          <div className='text-gray-400'>Shipping</div>
        )}
      </div>

      <div className='w-1/4'>
        {step3 ? (
          <Link to='/payment' className='text-blue-500 hover:text-blue-700'>
            Payment
          </Link>
        ) : (
          <div className='text-gray-400'>Payment</div>
        )}
      </div>

      <div className='w-1/4'>
        {step4 ? (
          <Link to='/placeorder' className='text-blue-500 hover:text-blue-700'>
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
