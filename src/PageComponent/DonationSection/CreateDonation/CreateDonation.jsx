import { useContext, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Select from 'react-select';
import { Button } from '@material-tailwind/react';
import { AuthContext } from '../../../AuthProvider/AuthProvider';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';


const petCategories = [
    { value: 'dog', label: 'Dog' },
    { value: 'cat', label: 'Cat' },
    { value: 'bird', label: 'Bird' },
    { value: 'rabbit', label: 'Rabbit' },
];
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const CreateDonation = () => {
const axiosSecure=useAxiosSecure()
    const { user } = useContext(AuthContext)

    const [imageUrl, setImageUrl] = useState('');


    const initialValues = {
        petName: '',
        petAge: '',
        category: '',
        petLocation: '',
        shortDescription: '',
        longDescription: '',
        maxDonate: '',
        status: false,
    };

    const validationSchema = Yup.object({
        petName: Yup.string().required('Pet name is required'),
        petAge: Yup.number().required('Pet age is required').positive('Age must be positive').integer('Age must be an integer'),
        maxDonate: Yup.number().required('Max Donate is required').positive('Max Donate must be positive').integer('Max Donate must be an integer'),
        dateField: Yup.date().required('Date is required'),
        category: Yup.string().required('Pet category is required'),
        petLocation: Yup.string().required('Pet location is required'),
        shortDescription: Yup.string().required('Short description is required'),
        longDescription: Yup.string().required('Long description is required'),
    });

    const handleImageUpload = async (file) => {
        const formData = new FormData();
        formData.append('image', file);


        const res = await axios.post(image_hosting_api, formData);
        setImageUrl(res.data.data.url);

    };

    const onSubmit = async (values, { resetForm }) => {
        const email = user ? user.email : "Unknown";
        const userName = user ? user.displayName : "Unknown";
        const photoURL = user ? user?.photoURL : "Unknown";
        const donateData = {
            ...values,
            petImage: imageUrl,
            email: email,
            userName: userName,
            photoURL: photoURL,
            donate:0,

            addedDate: new Date().toISOString(),
        };

        const donation = await axiosSecure.post('/donation', donateData);
        console.log(donation.data)
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Donation Campaign Added",
            showConfirmButton: false,
            timer: 1500
        });
        resetForm();
        setImageUrl('');
    };


    return (
        <div>
            <Helmet><title>CreateDonate</title></Helmet>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({ setFieldValue, isSubmitting, errors }) => (
                    <Form className='m-4 border p-2 shadow-lg bg-gray-100 rounded-md '>
                        <div className='text-center my-5 text-4xl font-bold'>
                            <h1>Add a New Campain</h1>
                        </div>
                        <div className='shadow-md px-2 '>

                            <label htmlFor="petImage" className="block text-sm font-medium">Pet Image :</label>
                            <div className="grid  md:grid-cols-3 gap-2">
                                <input type="file" onChange={(event) => {
                                    handleImageUpload(event.currentTarget.files[0]);
                                }} name="petImage" id="petImage" className="px-8 py-12 border-2 border-dashed rounded-md col-span-2  dark:border-gray-300 dark:text-gray-600 dark:bg-gray-100" />
                                {imageUrl && <img src={imageUrl} alt="Pet" className=' md:w-36' />}
                            </div>

                        </div>
                        <div className='md:grid-cols-3 gap-2 grid'>
                            <div className='mt-4 '>
                                <label htmlFor="petName">Pet Name:</label>
                                <Field className="input border border-brown-100 input-bordered w-full px-4 p-2 rounded  max-w-xs" id="petName" name="petName" placeholder="Pet Name" />
                                <ErrorMessage className='text-red-500' name="petName" component="div" />
                            </div>
                            <div className='mt-4'>
                                <label htmlFor="petAge">Pet Age :</label>
                                <Field className="input border border-brown-100 input-bordered w-full px-4 p-2 rounded  max-w-xs" id="petAge" name="petAge" placeholder="Pet Age" />
                                <ErrorMessage className='text-red-500' name="petAge" component="div" />
                            </div>
                            <div className='mt-3'>
                                <label htmlFor="category">Pet Category:</label>
                                <Select
                                    id="category"
                                    className="input border border-brown-100 input-bordered w-full px-4 p-2 rounded "
                                    options={petCategories}
                                    onChange={(option) => setFieldValue('category', option.value)}
                                />
                                <ErrorMessage className='text-red-500' name="category" component="div" />
                            </div>

                        </div>
                        <div className='grid gap-2 md:grid-cols-2'>
                            <div className='mt-4'>
                                <label htmlFor="petLocation">Pet Location :</label>
                                <Field className="input border border-brown-100 input-bordered w-full px-4 p-2 rounded  " id="petLocation" name="petLocation" placeholder="Pet Location" />
                                <ErrorMessage className='text-red-500' name="petLocation" component="div" />
                            </div>

                            <div className='mt-4'>
                                <label htmlFor="shortDescription">Short Description :</label>
                                <Field className="input border border-brown-100 input-bordered w-full px-4 p-2 rounded  " id="shortDescription" name="shortDescription" placeholder="Short Description" />
                                <ErrorMessage className='text-red-500' name="shortDescription" component="div" />
                            </div>
                        </div>
                        <div className='grid gap-2 md:grid-cols-2'>
                            <div className='items-center mt-4'>
                                <label htmlFor="">Max Donation Amount:</label>
                                <Field className="input border border-brown-100 input-bordered w-full px-4 p-2 rounded" id="maxDonate" name="maxDonate" placeholder="Max Donate" />
                                <ErrorMessage className='text-red-500' name="maxDonate" component="div" />
                            </div>
                            <div className='items-center mt-4'>
                            <label htmlFor="dateField">Campaign End Date:</label>
                            <Field className="input border border-brown-100 input-bordered w-full px-4 p-2 rounded  " id="dateField" name="dateField" type="date" placeholder="Select Date" />
                            <ErrorMessage className='text-red-500' name="dateField" component="div" />
                        </div>

                        </div>

                        <div className='items-center mt-4'>
                            <label htmlFor="longDescription">Long Description :</label>
                            <Field className="peer h-full min-h-[100px] w-full !resize-none  rounded-[7px] border border-blue-gray-200 border-t-transparent  px-3 py-2.5 font-sans text-sm font-normal outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
                                id="longDescription" name="longDescription" as="textarea" placeholder="Long Description" />
                            <ErrorMessage className='text-red-500' name="longDescription" component="div" />
                        </div>

                        <div className='mt-4 mx-10'>
                            <Button type="submit" className='w-full bg-green-400 uppercase' disabled={isSubmitting}>
                                Create Campaign
                            </Button>
                        </div>

                        {errors.general && <div className='text-red-500'>{errors.general}</div>}
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default CreateDonation;



















