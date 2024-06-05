import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
} from "@material-tailwind/react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet";
import Swal from "sweetalert2";


const SignUp = () => {
    const { register, handleSubmit,reset, formState: { errors } } = useForm();
    const {createUser,updateUserProfile}= useContext(AuthContext);
    const navigate = useNavigate ();

   
    const onSubmit = (data) => {
        console.log(data)
        createUser(data.email, data.password)
        .then(result=>{
            const loggedUser = result.user 
            console.log(loggedUser)
            updateUserProfile(data.name, data.photoURL)
            .then(() => {
                console.log('user profile info updated')
                reset();
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'User created successfully.',
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/');

            })
            .catch(error => console.log(error))
        })
    }

    

    // console.log(watch("example"));


    return (
        <div  className="mt-10 mx-8 grid md:grid-cols-2 gap-5   ">
            <Helmet> <title>Sign Up</title></Helmet>
            <div>
            <Card color="transparent" justifyContent="center" shadow={false}>
                <Typography variant="h4" color="blue-gray">
                    Sign Up
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                    Nice to meet you! Enter your details to register.
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                    <div className="mb-1 flex flex-col gap-6">
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Your Name
                        </Typography>
                        <Input
                        name="name"
                        {...register("name", { required: true })}
                        type="text"
                            size="lg"
                            placeholder="Your name"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                        />
                        {errors.name && <span className="text-red-600">name field is required</span>}
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Photo Url
                        </Typography>
                        <Input
                        name="PhotoURL"
                        {...register("photoURL", { required: true })}
                            size="lg"
                            placeholder="PhotoUrl"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                        />
                       {errors.photoURL && <span className="text-red-600">Photo URL is required</span>}
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Your Email
                        </Typography>
                        <Input
                        {...register("email", { required: true })}
                        name="email"
                            size="lg"
                            placeholder="name@mail.com"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                        />
                        {errors.email && <span className="text-red-600">email field is required</span>}
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Password
                        </Typography>
                        <Input
                            type="password"
                            name="password"
                            {...register("password", {
                                required: true,
                                minLength: 6,
                                maxLength: 20,
                                pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                            })}
                            size="lg"
                            placeholder="********"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                        />
                        {errors.password?.type == 'required' && <span className="text-red-600"> Password is required</span>}
                                {errors.password?.type == 'minLength' && <span className="text-red-600"> Password mast be 6 characters</span>}
                                {errors.password?.type == 'maxLength' && <span className="text-red-600"> Password mast be less 20 characters</span>}
                                {errors.password?.type == 'pattern' && <span className="text-red-600"> Password mast have a lower case a Uper case a number and also a special character </span>}
                    </div>

                    <Button type="onSubmit" className="mt-6" fullWidth>
                        sign up
                    </Button>
                   <Typography color="gray" className="mt-4 text-center font-normal">
                        Already have an account?{" "}
                        <Link to="/Login">Login</Link>
                    </Typography>
                </form>
                 
            </Card>
            </div>
            <img src="https://i.ibb.co/HT3NqkN/signup-85b84181aa4237e38075.jpg" alt="" />
        </div>
    );
};

export default SignUp;