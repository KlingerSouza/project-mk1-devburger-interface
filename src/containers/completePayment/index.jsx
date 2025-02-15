import { useEffect, useState } from "react";
import { useStripe } from "@stripe/react-stripe-js";
import "../../components/Stripe/styles.css";

const STATUS_CONTENT_MAP = {
    succeeded: {
        text: "Pagamento efetuado com sucesso!",
        iconColor: "#30B130",
        buttonText: 'Voltar ao cardápio',
        url: '/',
    },
    processing: {
        text: "Pagamento em processo...",
        iconColor: "#6D6E78",
        buttonText: 'Voltar ao cardápio',
        url: '/',
    },
    requires_payment_method: {
        text: "Falha no pagamento, tente novamente.",
        iconColor: "#DF1B41",
        buttonText: 'Tentar novamente',
        url: '/carrinho',
    },
    default: {
        text: "Algo deu errado, tente novamente.",
        iconColor: "#DF1B41",
        buttonText: 'Tentar novamente',
        url: '/carrinho',
    }
};

export function CompletePayment() {
    const stripe = useStripe();
    const [status, setStatus] = useState("default");
    const [intentId, setIntentId] = useState(null);

    useEffect(() => {
        if (!stripe) return;

        const clientSecret = new URLSearchParams(window.location.search).get(
            "payment_intent_client_secret"
        );

        if (!clientSecret) return;

        async function checkPaymentIntent() {
            console.log("🔍 Obtendo PaymentIntent...");
            
            const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);
            if (!paymentIntent) return;
            
            console.log("📌 [DEBUG] PaymentIntent recebido:", paymentIntent);
            setStatus(paymentIntent.status);
            setIntentId(paymentIntent.id);
            console.log("✅ [DEBUG] Status inicial definido:", paymentIntent.status);
            
            if (paymentIntent.status === "processing") {
                setTimeout(async () => {
                    console.log("⏳ [DEBUG] Rechecando status...");
                    const updatedIntent = await stripe.retrievePaymentIntent(clientSecret);
                    if (updatedIntent?.paymentIntent) {
                        console.log("📌 [DEBUG] Status atualizado do Stripe:", updatedIntent.paymentIntent.status);
                        setStatus(updatedIntent.paymentIntent.status);
                    }
                }, 2000);
            }
        }

        checkPaymentIntent();
    }, [stripe]);

    return (
        <div className="container">
            <div id="payment-status">
                <div id="status-icon" style={{ backgroundColor: STATUS_CONTENT_MAP[status]?.iconColor || "#DF1B41" }}>
                    {status === "succeeded" ? "✔️" : status === "processing" ? "⏳" : "❌"}
                </div>
                <h2 id="status-text">{STATUS_CONTENT_MAP[status]?.text || "Algo deu errado, tente novamente."}</h2>
                {intentId && (
                    <div id="details-table">
                        <table>
                            <tbody>
                                <tr>
                                    <td className="TableLabel">ID</td>
                                    <td id="intent-id" className="TableContent">{intentId}</td>
                                </tr>
                                <tr>
                                    <td className="TableLabel">Status</td>
                                    <td id="intent-status" className="TableContent">{status}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}
                {intentId && (
                    <a href={`https://dashboard.stripe.com/payments/${intentId}`} id="view-details" rel="noopener noreferrer" target="_blank">
                        Ver detalhes 🔗
                    </a>
                )}
                <a id="retry-button" href={STATUS_CONTENT_MAP[status]?.url || '/carrinho'}>{STATUS_CONTENT_MAP[status]?.buttonText || 'Tentar novamente'}</a>
            </div>
        </div>
    );
}
