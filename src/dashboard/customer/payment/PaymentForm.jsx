import React from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { use, useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "@/authProvider/AuthProvider";
import { toast } from "sonner";

const PaymentForm = ({ policy }) => {
  console.log(policy);
  const stripe = useStripe();
  const elements = useElements();

  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const { user } = use(AuthContext);
  const [error, setError] = useState("");

  const amount = policy.estimatedPremiumMonthly;
  const amountInCent = amount * 100;

  const policeId = policy.bookingPolicyId;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (!card) {
      return;
    }

    // step- 1: validate the card
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    console.log(paymentMethod);

    if (error) {
      setError(error.message);
    } else {
      setError("");
      console.log("payment method", paymentMethod);

      // step-2: create payment intent
      const res = await axiosSecure.post("/create-payment-intent", {
        amount: amountInCent,
        orderIds: policeId,
      });

      console.log("res form intent", res);

      const clientSecret = res.data.clientSecret;

      // step-3 confirm payment

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: user.displayName,
            email: user.email,
          },
        },
      });

      if (result.error) {
        setError(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        setError("");
        console.log("Payment succeeded!");

        const transactionId = result.paymentIntent.id;

        const paymentData = {
          orderId: policeId,
          email: user.email,
          policeName: policy.policyDetails.policyTitle,
          imageUrl: policy.policyDetails.imageUrl,
          name: user.displayName,
          amount: amount,
          transactionId: transactionId,
          paymentMethod: result.paymentIntent.payment_method_types,
        };

        const paymentRes = await axiosSecure.post(
          "/payment-success",
          paymentData
        );

        console.log(paymentRes.status);

        if (paymentRes.status === 200) {
          //  Show SweetAlert with transaction ID

          toast.success("Payment Successfull!!");

          //  Redirect to /my polices
          navigate("/dashboard");
        }
      }
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white p-8 rounded-2xl shadow-lg w-full max-w-md mx-auto border border-gray-200"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white">
          Complete Your Payment
        </h2>

        <div className="bg-gray-50 p-4 rounded-lg border border-gray-300">
          <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
            Card Details
          </label>
          <CardElement className="p-3 bg-white border rounded-md" />
        </div>

        <button
          type="submit"
          className={`w-full py-3 rounded-md text-black font-semibold transition   ${
            policy.paymentStatus === "paid" || !stripe
              ? "cursor-not-allowed bg-gray-400 text-black  "
              : "bg-amber-400 hover:bg-amber-500"
          }`}
          disabled={!stripe || policy.paymentStatus === "paid"}
        >
          Pay ${amount}
        </button>

        {error && (
          <p className="text-sm text-center text-red-500 font-medium">
            {error}
          </p>
        )}
      </form>
    </div>
  );
};

export default PaymentForm;
