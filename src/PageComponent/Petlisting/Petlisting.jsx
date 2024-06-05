import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import Select from 'react-select';

const options = [
    { value: '', label: 'All Categories' },
    { value: 'cat', label: 'Cat' },
    { value: 'dog', label: 'Dog' },
    { value: 'rabbit', label: 'Rabbit' },
    { value: 'bird', label: 'Bird' },
];

const Petlisting = () => {
    const [selectedOption, setSelectedOption] = useState(options[0]);
    const [searchTerm, setSearchTerm] = useState('');
    const [pets, setPets] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        let url = `http://localhost:5000/petlisting`;
        if (selectedOption.value) {
            url += `?category=${selectedOption.value}`;
        }
        if (searchTerm) {
            url += selectedOption.value ? `&search=${searchTerm}` : `?search=${searchTerm}`;
        }

        fetch(url)
       
                .then(res=>res.json())
           
            .then(data => {
                setPets(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error( error);
                setError(error);
                setIsLoading(false);
            });
    }, [selectedOption, searchTerm]);

    return (
        <div className="p-4">
            <div className="flex mb-4">
                <Select
                    defaultValue={selectedOption}
                    onChange={setSelectedOption}
                    options={options}
                    className="w-1/3 mr-4"
                />
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-2/3 p-2 border border-gray-300 rounded"
                />
            </div>

            {isLoading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}

            <div className="flex flex-wrap">
                {pets.map(pet => (
                    <Card key={pet._id} className="mt-6 w-96">
                        <CardHeader color="blue-gray" className="relative h-56">
                            <img
                                src={pet.imageUrl}  // Assuming the pet data has an imageUrl field
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
                        <CardFooter className="pt-0">
                            <Button>Read More</Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Petlisting;
