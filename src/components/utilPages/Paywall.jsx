import React, { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../CheckoutForm"; // Create this component for the actual form

const stripePromise = loadStripe(process.env.VITE_STRIPE_PUBLISHABLE_KEY); // Replace with your Stripe publishable key

const Paywall = () => {
  useEffect(() => {
    // Any additional setup can be done here
  }, []);

  return (
    <div className="paywall">
      <h2>Complete Your Payment</h2>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
};

export default Paywall;
