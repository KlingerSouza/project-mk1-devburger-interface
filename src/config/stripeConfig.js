import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
    'pk_test_51QdInY2e8Ma8z9xjvswrGpoXqa9C5CRFdRqnUNk8VTpbM2deMIf0jzhxVLmf4eW5LPUPpk3aLzPcuIDHjhOdfTJC00CGyIiOr8'
);

export default stripePromise;