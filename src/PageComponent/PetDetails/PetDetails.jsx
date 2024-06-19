import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    Button,
    Typography,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";

import { Helmet } from 'react-helmet';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import Swal from 'sweetalert2';

const PetDetails = () => {
    const { user } = useContext(AuthContext);
    const { id } = useParams();
    const [pet, setPet] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [location, setLocation] = useState('');
const axiosPublic =useAxiosPublic()
    const handleOpen = () => setOpen(!open);

    useEffect(() => {
        setIsLoading(true);

        fetch(`http://localhost:5000/petlisting/${id}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then(data => {
                setPet(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setIsLoading(false);
            });
    }, [id]);
    console.log(pet);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    const handleRequest = () => {
        const requestData = {
            userName: user?.displayName,
            userEmail: user?.email,
            posterEmail:pet?.email,
            petId:pet?._id,
            petName:pet?.petName,
            petImage:pet?.petImage,
            phoneNumber: phoneNumber,
            location: location,
        };
        axiosPublic.post('/petaddRequest',requestData)
        .then(res=>{
            console.log(res.data);
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your work has been saved",
                showConfirmButton: false,
                timer: 1500
              });
        })
          
    }

    return (
        <>
            <section className="py-16 px-8">
                <Helmet><title>PetDetails</title></Helmet>
                <div className="mx-auto border p-4 rounded-lg border-gray-600 container grid place-items-center grid-cols-1 md:grid-cols-2">
                    <img className='w-full p-4 m-4 rounded-lg border-gray-600 border' src={pet?.petImage} alt="" />
                    <div className='p-4'>
                        <Typography className="mb-4 text-gray-800 uppercase" variant="h4">
                            {pet?.category}
                        </Typography>
                        <Typography className="mb-4" variant="h3">
                            {pet?.petName}
                        </Typography>
                        <Typography variant="h5">{pet?.petName}</Typography>
                        <Typography variant="h5">{pet?.shortDescription}</Typography>
                        <Typography className="!mt-4 text-base font-normal leading-[27px] !text-gray-500">
                            {pet?.longDescription}
                        </Typography>
                        <Typography className="!text-sm font-bold !text-gray-700">
                            Date & time: {pet?.addedDate}
                        </Typography>
                    </div>
                    <Typography color="blue-gray" variant="h6">
                        Color
                    </Typography>
                    <div className="mb-4 flex w-full items-center gap-3 md:w-1/2 ">
                        <Button onClick={handleOpen} color="gray" className="w-52">
                            Adopt
                        </Button>
                    </div>
                </div>
            </section>

            <Dialog open={open} handler={handleOpen}>
                <DialogHeader>{pet?.petName}</DialogHeader>
                <DialogBody>
                    <div className='grid md:grid-cols-2 gap-2'>
                        <label>User name</label>
                        <input type="text" value={user?.displayName} className="input border p-2 border-black rounded-xl input-bordered w-full max-w-xs" disabled />
                        <label>Email</label>
                        <input type="text" value={user?.email} className="input border p-2 border-black rounded-xl input-bordered w-full max-w-xs" disabled />
                    </div>
                    <div className='grid md:grid-cols-2 gap-2 mt-2'>
                        <label>Phone Number</label>
                        <input
                            name='phoneNumber'
                            type="number"
                            value={phoneNumber}
                            required
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder="Phone Number"
                            className="input border p-2 border-black rounded-xl input-bordered w-full max-w-xs"
                        />
                        <label>Your Location</label>
                        <input
                            name="location"
                            type="text"
                            value={location}
                            required
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder="Your Location"
                            className="input  border p-2 border-black rounded-xl input-bordered w-full max-w-xs"
                        />
                    </div>
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={handleOpen}
                        className="mr-1"
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button variant="gradient" color="green" onClick={handleRequest}>
                        <span>Confirm</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
};

export default PetDetails;
