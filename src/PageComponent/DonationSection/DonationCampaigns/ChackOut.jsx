import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { Button, DialogFooter } from '@material-tailwind/react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useMutation } from '@tanstack/react-query';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';

const Checkout = ({ handleOpen }) => {
    const axiosPublic = useAxiosPublic();
    const axiosSecure=useAxiosSecure()
    const stripe = useStripe();
    const elements = useElements();

    const [price, setPrice] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [error, setError] = useState('');

    const { mutate: fetchClientSecret } = useMutation({
        mutationFn: async () => {
            const { data } = await axiosSecure.post('/create-payment-intent', { price: parseFloat(price) });
            setClientSecret(data.clientSecret);
            console.log('clientSecret',clientSecret);
        },
        
    });
    console.log('clientSecret',clientSecret);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements || !clientSecret) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (!card) {
            return;
        }

        try {
            const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: card,
                },
            });

            if (error) {
                console.error('[Stripe Error]', error);
                setError(error.message);
            } else {
                console.log('[PaymentIntent]', paymentIntent);
                // Handle successful payment (e.g., show success message, redirect)
            }
        } catch (error) {
            console.error('Error confirming payment', error);
            setError('Failed to process payment. Please try again.');
        }
    };

    const handleAmountChange = (e) => {
        setPrice(e.target.value);
    };

    const handleBlur = () => {
        if (price) {
            fetchClientSecret();
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className='grid'>
                <label>Donation Amount</label>
                <input
                    name='Donation Amount'
                    type="number"
                    onBlur={handleBlur}
                    required
                    value={price}
                    onChange={handleAmountChange}
                    placeholder="Donation Amount"
                    className="input border p-2 border-black rounded-xl input-bordered w-full max-w-xs"
                />
            </div>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <DialogFooter>
                <Button
                    variant="text"
                    color="red"
                    onClick={handleOpen}
                    className="mr-1"
                >
                    <span>Cancel</span>
                </Button>
                <Button
                    variant="gradient"
                    type="submit"
                    disabled={!stripe || !clientSecret}
                    color="green"
                >
                    <span>Confirm</span>
                </Button>
                <p>{error}</p>
            </DialogFooter>
        </form>
    );
};

export default Checkout;
