import { Button, Card, CardBody, CardFooter, CardHeader, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const DonationCampaign = () => {
    const [campaigns, setCampaign] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`http://localhost:5000/donationCampaign`);
            const result = await res.json();
            setCampaign(result);
        };
        fetchData();
    }, []);

    console.log(campaigns);

    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            <Helmet><title>DonationCampaign</title></Helmet>
            {campaigns.length > 0 ? (
                campaigns.map(campaign => (
                    <Card key={campaign._id} className="mt-6">
                        <CardHeader color="blue-gray" className="relative h-56">
                            <img
                                src={campaign.petImage}  // Assuming the pet data has an imageUrl field
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
                <Typography variant="h6" color="blue-gray" className="mt-6">
                    No campaigns available.
                </Typography>
            )}
        </div>
    );
};

export default DonationCampaign;
