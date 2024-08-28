import React, { useCallback } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";

// Initialize Stripe
const stripePromise = loadStripe(process.env.VITE_STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = () => {
  const fetchClientSecret = useCallback(() => {
    // Create a Checkout Session
    return fetch(
      `${process.env.VITE_API_CALL_ORIGIN}/create-checkout-session`,
      {
        method: "POST",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (!data.clientSecret) {
          throw new Error("Missing clientSecret in server response");
        }
        return data.clientSecret;
      });
  }, []);

  const options = { fetchClientSecret };

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
};

export default CheckoutForm;
