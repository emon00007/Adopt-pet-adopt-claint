import {
    Card,
    Input,
    Button,
    Typography,
  } from "@material-tailwind/react";


const LogIn = () => {
    return (
        <div  className="mt-10 mx-8 grid md:grid-cols-2 gap-5 items-center  ">
            <div>
            <Card color="transparent" justifyContent="center" shadow={false}>
                <Typography variant="h4" color="blue-gray">
                Sign In
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                    Nice to meet you! Enter your details to log in.
                </Typography>
                <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                    <div className="mb-1 flex flex-col gap-6">

                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Your Email
                        </Typography>
                        <Input
                            size="lg"
                            placeholder="name@mail.com"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                        />
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Password
                        </Typography>
                        <Input
                            type="password"
                            size="lg"
                            placeholder="********"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                        />
                    </div>

                    <Button className="mt-6" fullWidth>
                         Sign In
                    </Button>
                    <Typography color="gray" className="mt-4 text-center font-normal">
                        Already have an account?{" "}
                        <a href="#" className="font-medium text-gray-900">
                        sign up
                        </a>
                    </Typography>
                </form>
            </Card>
            </div>
            <img className="rounded-md" src="https://i.ibb.co/4JmR1JW/illustration-login-for-ui-ux-design-vector.jpg" alt="" />
        </div>
    );
};

export default LogIn;