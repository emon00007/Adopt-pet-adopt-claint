import { Link, } from 'react-router-dom';
import {

    Typography,

} from "@material-tailwind/react";
import { Helmet } from 'react-helmet';
const AboutUs = () => {
    return (
        <>
        
            <section className="py-16 px-8">
                <Helmet><title>About Us</title></Helmet>
                <div className="mx-auto border mt-5 p-4 rounded-lg border-gray-600 container grid  grid-cols-1 md:grid-cols-2">
                    <img className='w-full p-4 m-4 rounded-lg border-gray-600 border' src='https://i.ibb.co/j5Dd2k0/flat-design-family-with-pets-illustration-52683-85521.jpg' alt="" />
                    <div className='p-4 text-center'>
                        <div className='text-start border-r-4 border-blue-500  m-2 p-2'> 
                        <Typography className='font-bold  text-3xl text-start'>
                        About Us
                        </Typography>
                            
                        </div>
                        <div className='text-start m-2 p-2'> 
                        <Typography className=' font-medium text-blue-gray-600 text-xl text-start'>
                        Welcome to Adopets,Adopets was started in 2024 to introduce a pet adoption platform, a platform dedicated to helping pets find loving homes. We connect prospective pet owners with pets in need of adoption.
                        </Typography>
                            
                        </div>
                        <div className='text-start  m-2 p-2'>
                            <li className='mt-5 text-blue-gray-600 '>Adopets was started in 2024 to introduce a pet adoption platform</li>
                            <li className='mt-5 text-blue-gray-600 '>We aim to reduce homeless pets. Adopt through us to give a pet a second chance and alleviate shelter burden.</li>
                            <li className='mt-5 text-blue-gray-600 '>Join us in making a difference. Every action counts towards creating a better world for these loving animals.</li>
                            <li className='mt-5 text-blue-gray-600 '>We believe that HOW you do anything, means everything. Our job is to elevate our customers, our employees, our products, and our individual performance</li>
                        </div>



                        <div className="mb-4 flex w-full items-center gap-3 md:w-1/2 ">
                        <Link to='/Login' color="gray" className="  ml-6 font-bold  border bg-[#00ffa6]  px-4 p-2  rounded-xl">
                            Sign Up
                        </Link>
                    </div>
                    </div>

                </div>
            </section>

        </>
    );
};

export default AboutUs;