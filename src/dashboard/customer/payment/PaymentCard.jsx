import { Elements } from '@stripe/react-stripe-js'
import React from 'react'
import PaymentForm from './PaymentForm'
import { loadStripe } from '@stripe/stripe-js';


const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

const PaymentCard = ({policy,refetch}) => {
  return (
    <div>
      <title>Payment Card</title>
      <Elements stripe={stripePromise}>
        <PaymentForm policy={policy}></PaymentForm>
      </Elements>
    </div>
  )
}

export default PaymentCard
