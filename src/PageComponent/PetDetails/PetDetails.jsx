import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardHeader, CardBody, Typography,  } from "@material-tailwind/react";

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

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    return (
        pet && (
            <Card className="mt-6 w-96 mx-auto">
                <CardHeader color="blue-gray" className="relative h-56">
                    <img
                        src={pet.imageUrl}
                        alt="pet"
                        className="w-full h-full object-cover"
                    />
                </CardHeader>
                <CardBody>
                    <Typography variant="h5" color="blue-gray" className="mb-2">
                        {pet.name}
                    </Typography>
                    <Typography>
                        {pet.description}
                    </Typography>
                </CardBody>
            </Card>
        )
    );
};

export default PetDetails;
