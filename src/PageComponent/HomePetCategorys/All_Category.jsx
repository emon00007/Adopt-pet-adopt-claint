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
const All_Category = () => {
    const [categorys]=useCategory()
    
    return (
        <div className="p-4">
        <div className=" grid md:grid-cols-2 lg:grid-cols-3 gap-10  ">
            {categorys.map(category => (
                <Card key={category._id} className="mt-6 ">
                    <CardHeader color="blue-gray" className="relative h-56">
                        <img
                            src={category.petImage}  
                            alt="pet"
                            className="w-full h-full object-cover"
                        />
                    </CardHeader>
                    <CardBody>
                        <Typography variant="h5" color="blue-gray" className="mb-2">
                            {category.petName}
                        </Typography>
                        <Typography>
                            {category.shortDescription}
                        </Typography>
                    </CardBody>
                    <CardFooter className="pt-0">

                        <Link to={`/pet/${category._id}`}><Button >View Details</Button></Link>
                    </CardFooter>
                </Card>
            ))}
        </div>
    </div>
    );
};

export default All_Category;