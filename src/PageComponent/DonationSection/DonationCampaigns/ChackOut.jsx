import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useContext, useState } from 'react';
import { Button, DialogFooter } from '@material-tailwind/react';
import { QueryClient, useMutation } from '@tanstack/react-query';
import { AuthContext } from '../../../AuthProvider/AuthProvider';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const Checkout = ({ handleOpen, donatePet, open }) => {
    const axiosSecure = useAxiosSecure();
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useContext(AuthContext);

    const [price, setPrice] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [error, setError] = useState('');
    const [transitionId, setTransitionId] = useState('');

    const { mutate: fetchClientSecret } = useMutation({
        mutationFn: async () => {
            const { data } = await axiosSecure.post('/create-payment-intent', { price: parseFloat(price) });
            setClientSecret(data.clientSecret);
        },
    });

    const mutation = useMutation({
        mutationFn: async () => {
            const newAmount = { donate: parseFloat(donatePet?.donate + parseFloat(price)) };
            const data = await axiosSecure.patch(`/UpdateDonate/${donatePet._id}`, newAmount);
            return data;
        },
        onSuccess: () => {
            // Invalidate and refetch query with key 'todos'
            QueryClient.invalidateQueries(['todos']);
        },
    });

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
                    billing_details: {
                        email: user?.email || 'anonymous',
                        name: user?.displayName || 'anonymous',
                    },
                },
            });

            if (error) {
                console.error('[Stripe Error]', error);
                setError(error.message);
            } else {
                console.log('[PaymentIntent]', paymentIntent);
                if (paymentIntent.status === "succeeded") {
                    console.log('TransitionId', paymentIntent.id);
                    setTransitionId(paymentIntent.id);

                    const payment = {
                        email: user.email,
                        price: price,
                        date: new Date(),
                        petImage: donatePet?.petImage,
                        donationId: donatePet?._id,
                        transitionId: paymentIntent.id,
                        status: 'takeing' // Typo: should be 'taking'?
                    };

                    console.log(payment);
                    const res = await axiosSecure.post('/payments', payment);
                    console.log('payment', res);

                    if (res.data?.insertedId) {
                        await mutation.mutate();
                        handleOpen(!open);
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Payment success",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                    }
                }
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
                <p className='text-red-800'>{error}</p>
                {/* {transitionId && <p className='text-green-600'>Your transaction id :{transitionId}</p>} */}
            </DialogFooter>
        </form>
    );
};

export default Checkout;
