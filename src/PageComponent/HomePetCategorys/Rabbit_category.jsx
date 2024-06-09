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
const Rabbit_category = () => {
    const [category]=useCategory()
    const rabbits = category.filter(item=>item.category ==='rabbit')
    return (
        <div className="p-4">
        <div className=" grid md:grid-cols-2 lg:grid-cols-3 gap-10  ">
            {rabbits.map(rabbit => (
                <Card key={rabbit._id} className="mt-6 ">
                    <CardHeader color="blue-gray" className="relative h-56">
                        <img
                            src={rabbit.petImage}  // Assuming the pet data has an imageUrl field
                            alt="pet"
                            className="w-full h-full object-cover"
                        />
                    </CardHeader>
                    <CardBody>
                        <Typography variant="h5" color="blue-gray" className="mb-2">
                            {rabbit.petName}
                        </Typography>
                        <Typography>
                            {rabbit.shortDescription}
                        </Typography>
                    </CardBody>
                    <CardFooter className="pt-0">

                        <Link to={`/pet/${rabbit._id}`}><Button >View Details</Button></Link>
                    </CardFooter>
                </Card>
            ))}
        </div>
    </div>
    );
};

export default Rabbit_category;