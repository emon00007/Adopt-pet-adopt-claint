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
import { Helmet } from "react-helmet";
const Bird_category = () => {
    const [category]=useCategory()
    const birds = category.filter(item=>item.category ==='bird')
    return (
        <div className="p-4">
            <Helmet><title>Bird</title></Helmet>
        <div className=" grid md:grid-cols-2 lg:grid-cols-3 gap-10  ">
            {birds.map(bird => (
                <Card key={bird._id} className="mt-6 ">
                    <CardHeader color="blue-gray" className="relative h-56">
                        <img
                            src={bird.petImage}  
                            alt="pet"
                            className="w-full h-full object-cover"
                        />
                    </CardHeader>
                    <CardBody>
                        <Typography variant="h5" color="blue-gray" className="mb-2">
                            {bird.petName}
                        </Typography>
                        <Typography>
                            {bird.shortDescription}
                        </Typography>
                    </CardBody>
                    <CardFooter className="pt-0">

                        <Link to={`/pet/${bird._id}`}><Button >View Details</Button></Link>
                    </CardFooter>
                </Card>
            ))}
        </div>
    </div>
    );
};

export default Bird_category;