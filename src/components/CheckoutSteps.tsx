import React from 'react'

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
          <a href='/login' className='text-blue-500 hover:text-blue-700'>
            Sign In
          </a>
        ) : (
          <div className='text-gray-400'>Sign In</div>
        )}
      </div>

      <div className='w-1/4'>
        {step2 ? (
          <a href='/shipping' className='text-blue-500 hover:text-blue-700'>
            Shipping
          </a>
        ) : (
          <div className='text-gray-400'>Shipping</div>
        )}
      </div>

      <div className='w-1/4'>
        {step3 ? (
          <a href='/payment' className='text-blue-500 hover:text-blue-700'>
            Payment
          </a>
        ) : (
          <div className='text-gray-400'>Payment</div>
        )}
      </div>

      <div className='w-1/4'>
        {step4 ? (
          <a href='/placeorder' className='text-blue-500 hover:text-blue-700'>
            Place Order
          </a>
        ) : (
          <div className='text-gray-400'>Place Order</div>
        )}
      </div>
    </div>
  )
}

export default CheckoutSteps
