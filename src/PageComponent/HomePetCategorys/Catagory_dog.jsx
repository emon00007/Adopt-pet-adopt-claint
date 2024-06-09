import { Link } from "react-router-dom";
import useCategory from "../../Hooks/useCategory";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
   
} from "@material-tailwind/react";
const Catagory_dog = () => {
    const [category]=useCategory()
        const dogs = category.filter(item=>item.category ==='dog')
    return (
        
        <div className="p-4">
        <div className=" grid md:grid-cols-2 lg:grid-cols-3 gap-10  ">
            {dogs.map(dog => (
                <Card key={dog._id} className="mt-6 ">
                    <CardHeader color="blue-gray" className="relative h-56">
                        <img
                            src={dog.petImage}  
                            alt="pet"
                            className="w-full h-full object-cover"
                        />
                    </CardHeader>
                    <CardBody>
                        <Typography variant="h5" color="blue-gray" className="mb-2">
                            {dog.petName}
                        </Typography>
                        <Typography>
                            {dog.shortDescription}
                        </Typography>
                    </CardBody>
                    <CardFooter className="pt-0">

                        <Link to={`/pet/${dog._id}`}><Button >View Details</Button></Link>
                    </CardFooter>
                </Card>
            ))}
        </div>
    </div>
    );
};

export default Catagory_dog;