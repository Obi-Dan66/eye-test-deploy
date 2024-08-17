import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const paymentIntentId = queryParams.get("payment_intent");
  const navigate = useNavigate();
  return (
    <div className="payment-success">
      <h2>Vaše platba byla úspěšná!</h2>
      <p>Payment Intent ID: {paymentIntentId}</p>
      <button className="defaultButton" onClick={() => navigate("/mapa")}>
        Podívejte se na mapu.
      </button>
    </div>
  );
};

export default PaymentSuccess;
