import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const sessionId = queryParams.get("session_id");
  const navigate = useNavigate();
  const [paymentIntentId, setPaymentIntentId] = useState(null);

  useEffect(() => {
    const fetchSessionStatus = async () => {
      try {
        const response = await fetch(
          `${process.env.VITE_API_CALL_ORIGIN}/session-status?session_id=${sessionId}`
        );
        const data = await response.json();
        setPaymentIntentId(data.payment_intent);
      } catch (error) {
        console.error("Error fetching session status:", error);
      }
    };

    if (sessionId) {
      fetchSessionStatus();
    }
  }, [sessionId]);

  return (
    <div className="payment-success">
      <h2>Vaše platba byla úspěšná!</h2>
      <p>Status platby: Dokončeno</p>
      <p>ID platby: {paymentIntentId}</p>
      <button className="defaultButton" onClick={() => navigate("/mapa")}>
        Podívejte se na mapu.
      </button>
    </div>
  );
};

export default PaymentSuccess;
