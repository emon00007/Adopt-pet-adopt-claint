import Select from "react-select"; // Correct import for react-select
import axios from "axios";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { Button } from "@material-tailwind/react";
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const petCategories = [
    { value: 'dog', label: 'Dog' },
    { value: 'cat', label: 'Cat' },
    { value: 'bird', label: 'Bird' },
    { value: 'rabbit', label: 'Rabbit' },
];

const UpdateDonation = () => {
    const [imageUrl, setImageUrl] = useState('');
    const [category, setCategory] = useState(null);

    const handleImageUpload = async (file) => {
        try {
            const formData = new FormData();
            formData.append('image', file);

            const res = await axios.post(image_hosting_api, formData);
            setImageUrl(res.data.data.url);
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };

    return (
        <div className="mt-3">
            <Helmet><title>Update Donate Page</title></Helmet>
            <div className="m-5">
                <h1 className="text-center text-2xl font-bold">Update Pet</h1>

                <div>
                    <div className='shadow-md px-2 '>
                        <label htmlFor="petImage" className="block text-sm font-medium">Pet Image :</label>
                        <div className="grid md:grid-cols-3 gap-2">
                            <input
                                type="file"
                                onChange={(event) => {
                                    handleImageUpload(event.currentTarget.files[0]);
                                }}
                                name="petImage"
                                id="petImage"
                                className="px-8 py-12 border-blue-600 border-2 border-dashed rounded-md col-span-2 dark:border-gray-300 dark:text-gray-600 dark:bg-gray-100"
                            />
                            {imageUrl && <img src={imageUrl} alt="Pet" className='md:w-36' />}
                        </div>
                    </div>

                    <div className='md:grid-cols-3 gap-2 grid'>
                        <div className='mt-4'>
                            <label htmlFor="petName">Pet Name:</label>
                            <input
                                className="input border border-brown-100 input-bordered w-full px-4 p-2 rounded max-w-xs"
                                id="petName"
                                name="petName"
                                placeholder="Pet Name"
                            />
                        </div>

                        <div className='mt-4'>
                            <label htmlFor="petAge">Pet Age :</label>
                            <input
                                className="input border border-brown-100 input-bordered w-full px-4 p-2 rounded max-w-xs"
                                id="petAge"
                                name="petAge"
                                placeholder="Pet Age"
                            />
                        </div>

                        <div className='mt-3'>
                            <label htmlFor="category">Pet Category:</label>
                            <Select
                                id="category"
                                className="input border border-brown-100 input-bordered w-full px-4 p-2 rounded"
                                options={petCategories}
                                onChange={(option) => setCategory(option.value)}
                            />
                        </div>
                    </div>
                    <div className='grid gap-2 md:grid-cols-2'>
                        <div className='items-center mt-4'>
                            <label htmlFor="">Max Donation Amount:</label>
                            <input className="input border border-brown-100 input-bordered w-full px-4 p-2 rounded  " id="maxDonate" name="maxDonate" placeholder="Max Donate" />

                        </div>
                        <div className='items-center mt-4'>
                            <label htmlFor="dateField">Campaign End Date:</label>
                            <input className="input border border-brown-100 input-bordered w-full px-4 p-2 rounded  " id="dateField" name="dateField" type="date" placeholder="Select Date" />

                        </div>
                    </div>

                    <div className='grid gap-2 md:grid-cols-2'>
                        <div className='mt-4'>
                            <label htmlFor="petLocation">Pet Location :</label>
                            <input className="input border border-brown-100 input-bordered w-full px-4 p-2 rounded  " id="petLocation" name="petLocation" placeholder="Pet Location" />

                        </div>

                        <div className='mt-4'>
                            <label htmlFor="shortDescription">Short Description :</label>
                            <input className="input border border-brown-100 input-bordered w-full px-4 p-2 rounded  " id="shortDescription" name="shortDescription" placeholder="Short Description" />

                        </div>
                    </div>
                    <div className='items-center mt-4'>
                        <label htmlFor="longDescription">Long Description :</label>
                        <input className="peer h-full min-h-[100px] w-full !resize-none  rounded-[7px] border border-blue-gray-200 border-t-transparent  px-3 py-2.5 font-sans text-sm font-normal outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
                            id="longDescription" name="longDescription" placeholder="Long Description" />

                    </div>

                    <div className='mt-4 ml-10'>
                        <Button type="submit" >
                            Update Donate  Details
                        </Button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default UpdateDonation;
