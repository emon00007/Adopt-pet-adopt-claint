import { Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";

const GivFavrite = () => {
    return (
        <section className="py-16 px-8">

            <div className="mx-auto border mt-5 p-4 rounded-lg border-gray-600 container grid  grid-cols-1 md:grid-cols-2">

                <div className='p-4 text-center'>
                    <div className='text-start m-2 border-l-4 border-blue-500 p-2'>
                        <Typography className='font-bold  text-3xl text-start'>
                            Give a Pet a Forever Home
                        </Typography>

                    </div>
                    <div className='text-start m-2 p-2'>
                        <Typography className=' font-medium text-blue-gray-600 text-xl text-start'>

                            Adopting a pet is a transformative experience. By providing a pet with a loving home, you are not only saving a life but also gaining a devoted friend and companion. Every animal deserves the opportunity to live in a secure and nurturing environment.
                        </Typography>

                    </div>
                    <div className='text-start  m-2 p-2'>
                        <Typography className=' font-medium text-blue-gray-600 text-xl text-start'>

                        Join us in our mission to create better lives for pets in need. Your compassion and care can make a tremendous impact on the life of a pet. Adopt today and become a hero to a homeless animal.
                        </Typography>
                    </div>
                    <div className='text-start  m-2 p-2'>
                        <Typography className=' font-medium text-blue-gray-600 text-xl text-start'>
                        Help us give pets a brighter future. Your kindness and care can transform the life of a pet in need. Adopt today and make a lasting difference for a homeless animal.
                        </Typography>
                    </div>
                    <div className='text-start  m-2 p-2'>
                        <Typography className=' font-medium text-blue-gray-600 text-xl text-start'>

                        Your kindness can transform a pet's life. Adopt today and make a lasting difference for a homeless animal. Give pets a brighter future with your love and care. Be a hero to a pet in need.
                        </Typography>
                    </div>



                    <div className="mb-4 flex w-full items-center gap-3 md:w-1/2 ">
                        <Link to='/Petlisting' color="gray" className=" ml-6 font-bold  border bg-[#00ffa6]  px-4 p-2  rounded-xl">
                            Adopt Now
                        </Link>
                    </div>
                </div>
                <img className='w-full p-4 mr-4 rounded-lg border-gray-600 border' src='https://i.ibb.co/VBMmFhV/x0sf-vgiu-211012.jpg' alt="" />

            </div>
        </section>
    );
};

export default GivFavrite;