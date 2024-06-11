import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    Button,
    IconButton, 
    Typography,
} from "@material-tailwind/react";
import Swal from 'sweetalert2';

const PetDetails = () => {
    const { id } = useParams();
    const [pet, setPet] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    // console.log(id)
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
                setError(error);
                setIsLoading(false);
            });
    }, [id]);
    console.log(pet);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }
    const HandelAdope =()=>{
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500
          });
    }

    return (
        pet && (
            <section className="py-16 px-8">
                <div className="mx-auto border p-4 rounded-lg border-gray-600 container grid place-items-center grid-cols-1 md:grid-cols-2">
                    <img className='w-full p-4 m-4  rounded-lg border-gray-600 border' src={pet?.petImage} alt="" />
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
                            Date & time:{pet?.addedDate}
                        </Typography>
                    </div>
                    <Typography color="blue-gray" variant="h6">
                        Color
                    </Typography>

                    <div className="mb-4 flex w-full items-center gap-3 md:w-1/2 ">
                        <Button onClick={HandelAdope} color="gray" className="w-52">
                            Adopt
                        </Button>
                        <IconButton color="gray" variant="text" className="shrink-0">

                        </IconButton>
                    </div>
                </div>

            </section>
        )
    );
};

export default PetDetails;
