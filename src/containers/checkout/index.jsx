import { Elements } from "@stripe/react-stripe-js";
import { useLocation } from "react-router-dom";

import stripePromise from "../../config/stripeConfig";
import { toast } from "react-toastify";
import CheckoutForm from "../../components/Stripe/CheckoutForm";

export function Checkout() {
    const {
        state: { clientSecret },
    } = useLocation();

    
        if (!clientSecret) {
            toast.error('Erro inesperado! 🤯', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
        }

    
    return (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutForm />
        </Elements>
    )
};