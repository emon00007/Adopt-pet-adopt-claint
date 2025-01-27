import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
   
} from "@material-tailwind/react";
import {  useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, } from "react-router-dom";

import Select from 'react-select';
import Loder from "../Loder";


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
    const [isLoading, setIsLoading] = useState(false);
    

    useEffect(() => {
        setIsLoading(true);
        let url = `https://adope-pates-sarver-site.vercel.app/petlisting`;
        if (selectedOption.value) {
            url += `?category=${selectedOption.value}`;
        }
        if (searchTerm) {
            url += selectedOption.value ? `&search=${searchTerm}` : `?search=${searchTerm}`;
        }
    
        fetch(url)
            .then(res => res.json())
            .then(data => {
                data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setPets(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error(error);
                setIsLoading(false);
            });
    }, [selectedOption, searchTerm]);
    
console.log(selectedOption,searchTerm);
    return (
        <div className="p-4">
            <Helmet><title>PetListing</title></Helmet>
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

            {isLoading && <Loder></Loder>}
            

            <div className=" grid md:grid-cols-2 lg:grid-cols-3 gap-10  ">
                {pets.map(pet => (
                    <Card key={pet._id} className="mt-6 ">
                        <CardHeader color="blue-gray" className="relative h-56">
                            <img
                                src={pet.petImage}  // Assuming the pet data has an imageUrl field
                                alt="pet"
                                className="w-full h-full object-cover"
                            />
                        </CardHeader>
                        <CardBody>
                            <Typography variant="h5" color="blue-gray" className="mb-2">
                                {pet.petName}
                            </Typography>
                            <Typography>
                                {pet.shortDescription}
                            </Typography>
                        </CardBody>
                        <CardFooter className="pt-0">
                        
                        <Link to={`/pet/${pet._id}`}><Button >View Details</Button></Link>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Petlisting;
