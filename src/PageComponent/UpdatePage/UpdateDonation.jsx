import Select from "react-select";
import axios from "axios";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Button } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const petCategories = [
    { value: 'dog', label: 'Dog' },
    { value: 'cat', label: 'Cat' },
    { value: 'bird', label: 'Bird' },
    { value: 'rabbit', label: 'Rabbit' },
];

const UpdateDonation = () => {
    const axiosSecure = useAxiosSecure();
    const { petName, petAge,dateField,category,maxDonate ,petLocation, petImage, shortDescription, longDescription, _id } = useLoaderData();
    const [imageUrl, setImageUrl] = useState(petImage);
    const [categoryOption, setCategoryOption] = useState(petCategories.find(cat => cat.value === category));

    const { register, handleSubmit, setValue } = useForm({
        defaultValues: {
            petName,
            petAge,
            category,
            petLocation,
            petImage,
            maxDonate,
            dateField,
            shortDescription,
            longDescription,
        },
    });

    useEffect(() => {
        setValue('petName', petName);
        setValue('petAge', petAge);
        setValue('category', category);
        setValue('petLocation', petLocation);
        setValue('shortDescription', shortDescription);
        setValue('longDescription', longDescription);
        setValue('maxDonate',maxDonate)
        setValue('dateField',dateField)
    }, [petName, petAge, category, petLocation, petImage, shortDescription, longDescription,maxDonate, dateField,setValue]);

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

    const onSubmit = async (data) => {
        data.category = categoryOption.value;
        data.petImage = imageUrl;

        try {
            const res = await axiosSecure.patch(`/UpdateDonate/${_id}`, data);
            console.log('Pet updated successfully:', res.data);
            // Redirect or notify user of success
        } catch (error) {
            console.error("Error updating pet:", error);
        }
    };

    return (
        <div className="mt-3">
            <Helmet><title>Update Donate Page</title></Helmet>
            <div className="m-5">
                <h1 className="text-center text-2xl font-bold">Update Pet</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <div className='shadow-md px-2 '>
                            <label htmlFor="petImage" className="block text-sm font-medium">Pet Image :</label>
                            <div className="grid md:grid-cols-3 gap-2">
                                <input
                                    type="file"
                                    onChange={(event) => handleImageUpload(event.currentTarget.files[0])}
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
                                    {...register("petName")}
                                />
                            </div>

                            <div className='mt-4'>
                                <label htmlFor="petAge">Pet Age :</label>
                                <input
                                    className="input border border-brown-100 input-bordered w-full px-4 p-2 rounded max-w-xs"
                                    id="petAge"
                                    name="petAge"
                                    placeholder="Pet Age"
                                    {...register("petAge")}
                                />
                            </div>

                            <div className='mt-3'>
                                <label htmlFor="category">Pet Category:</label>
                                <Select
                                    id="category"
                                    className="input border border-brown-100 input-bordered w-full px-4 p-2 rounded"
                                    options={petCategories}
                                    defaultValue={categoryOption}
                                    onChange={(option) => setCategoryOption(option)}
                                />
                            </div>
                        </div>
                        <div className='grid gap-2 md:grid-cols-2'>
                            <div className='items-center mt-4'>
                                <label htmlFor="maxDonate">Max Donation Amount:</label>
                                <input
                                    className="input border border-brown-100 input-bordered w-full px-4 p-2 rounded"
                                    id="maxDonate"
                                    name="maxDonate"
                                    placeholder="Max Donate"
                                    {...register("maxDonate")}
                                />
                            </div>
                            <div className='items-center mt-4'>
                                <label htmlFor="dateField">Campaign End Date:</label>
                                <input
                                    className="input border border-brown-100 input-bordered w-full px-4 p-2 rounded"
                                    id="dateField"
                                    name="dateField"
                                    type="date"
                                    placeholder="Select Date"
                                    {...register("dateField")}
                                />
                            </div>
                        </div>

                        <div className='grid gap-2 md:grid-cols-2'>
                            <div className='mt-4'>
                                <label htmlFor="petLocation">Pet Location :</label>
                                <input
                                    className="input border border-brown-100 input-bordered w-full px-4 p-2 rounded"
                                    id="petLocation"
                                    name="petLocation"
                                    placeholder="Pet Location"
                                    {...register("petLocation")}
                                />
                            </div>

                            <div className='mt-4'>
                                <label htmlFor="shortDescription">Short Description :</label>
                                <input
                                    className="input border border-brown-100 input-bordered w-full px-4 p-2 rounded"
                                    id="shortDescription"
                                    name="shortDescription"
                                    placeholder="Short Description"
                                    {...register("shortDescription")}
                                />
                            </div>
                        </div>
                        <div className='items-center mt-4'>
                            <label htmlFor="longDescription">Long Description :</label>
                            <textarea
                                className="peer h-full min-h-[100px] w-full !resize-none rounded-[7px] border border-blue-gray-200 border-t-transparent px-3 py-2.5 font-sans text-sm font-normal outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
                                id="longDescription"
                                name="longDescription"
                                placeholder="Long Description"
                                {...register("longDescription")}
                            />
                        </div>

                        <div className='mt-4 ml-10'>
                            <Button type="submit">
                                Update Donate Details
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateDonation;