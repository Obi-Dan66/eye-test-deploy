import React from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (error) {
      console.error("Stripe error:", error);
    } else {
      try {
        // Create a payment intent on the server
        const paymentIntentResponse = await axios.post(
          `${import.meta.env.VITE_API_CALL_ORIGIN}/create-payment-intent`,
          {
            payment_method: paymentMethod.id,
          }
        );

        console.log("Server response:", paymentIntentResponse.data);

        const { client_secret } = paymentIntentResponse.data;

        if (!client_secret) {
          throw new Error("Missing client_secret in server response");
        }

        // Handle successful payment here
        console.log("Payment successful!");
        // navigate("/eye-test-deploy/payment-success");
        navigate("/payment-success");
      } catch (err) {
        console.error("Server error:", err);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  );
};

export default CheckoutForm;
