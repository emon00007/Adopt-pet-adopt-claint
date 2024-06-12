import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    Button,
    
    Typography,
} from "@material-tailwind/react";
import { Helmet } from 'react-helmet';



const DonationDetails = () => {
    const [donatePet, setDonatePet] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { id } = useParams();
    useEffect(() => {
        setIsLoading(true);

        fetch(`http://localhost:5000/donationCampaign/${id}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then(data => {
                setDonatePet(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);

                setIsLoading(false);
            });
    }, [id]);
    console.log(donatePet);

    const handelDonate = () => {

    }

    if (isLoading) {
        return <p>Loading...</p>;
    }
    return (

        <section className="py-16 px-8">
            <Helmet><title>DonationDetails</title></Helmet>
            <div className="mx-auto border p-4 rounded-lg border-gray-600 container  grid place-items-center grid-cols-1 md:grid-cols-2">
                <img className='w-full p-4 m-4  rounded-lg border-gray-600 border h-[700px]' src={donatePet?.petImage} alt="" />
                <div className='p-4'>
                    <Typography className="mb-4 text-gray-800 uppercase" variant="h4">
                        {donatePet?.category}
                    </Typography>
                    <Typography className="mb-4" variant="h3">
                        {donatePet?.petName}
                    </Typography>
                    <Typography variant="h5">{donatePet?.petName}</Typography>
                    <Typography variant="h6">Max Donate Amount{donatePet?.petName}</Typography>
                    <Typography variant="h5">{donatePet?.shortDescription}</Typography>
                    <Typography className="!mt-4 text-base font-normal leading-[27px] !text-gray-500">
                        {donatePet?.longDescription}
                    </Typography>

                    <Typography className="!text-sm font-bold !text-gray-700">
                        Date & time:{donatePet?.addedDate}
                    </Typography>
                    <div className="mb-4 flex w-full items-center gap-3 md:w-1/2 ">
                        <Button onClick={handelDonate} color="gray" className="w-52">
                           Donate Now
                        </Button>

                    </div>
                </div>
            </div>

        </section>
    );
};

export default DonationDetails;