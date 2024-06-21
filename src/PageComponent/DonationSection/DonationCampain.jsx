import { Button, Card, CardBody, CardFooter, CardHeader, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Loder from "../Loder";

const DonationCampaign = () => {
    const [campaigns, setCampaigns] = useState([]);
    const axiosPublic= useAxiosPublic()

    useEffect(() => {
        const fetchData = async () => { 
                const res = await axiosPublic.get(`/donationCampaign`);
                const sortedCampaigns = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setCampaigns(sortedCampaigns);
            
        };
    
        fetchData();
    }, []);
    
    

    console.log("Campaigns:", campaigns);

    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            <Helmet>
                <title>Donation Campaigns</title>
            </Helmet>
            {campaigns.length > 0 ? (
                campaigns.map((campaign) => (
                    <Card key={campaign._id} className="mt-6">
                        <CardHeader color="blue-gray" className="relative h-56">
                            <img
                                src={campaign.petImage} // Assuming the pet data has an imageUrl field
                                alt="pet"
                                className="w-full h-full object-cover"
                            />
                        </CardHeader>
                        <CardBody>
                            <Typography variant="h5" color="blue-gray" className="mb-2">
                                {campaign.petName}
                            </Typography>
                            <Typography>
                                {campaign.shortDescription}
                            </Typography>
                        </CardBody>
                        <CardFooter className="pt-0">
                            <Link to={`/donation/${campaign._id}`}>
                                <Button>View Details</Button>
                            </Link>
                        </CardFooter>
                    </Card>
                ))
            ) : (
                <div className="text-center"><Loder></Loder></div>
            )}
        </div>
    );
};

export default DonationCampaign;
