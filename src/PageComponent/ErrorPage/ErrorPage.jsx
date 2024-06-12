import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";


const ErrorPage = () => {
    return (
        <section className="flex items-center h-full p-16 dark:bg-gray-50 dark:text-gray-800">
            <Helmet><title>404ErrorPage</title></Helmet>
        <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
            <div className="max-w-md text-center">
                <h2 className="mb-8 font-extrabold text-9xl dark:text-gray-400">
                    <img src="https://i.ibb.co/2Fzt0yB/404-error-page-not-found-3d-illustration-png.webp" alt="" />
                </h2>
                <p className="text-2xl font-semibold md:text-3xl">Sorry, we could not find this page.</p>
                <p className="mt-4 mb-8 dark:text-gray-600">But do not worry, you can find plenty of other things on our homepage.</p>
                <Link to="/" rel="noopener noreferrer" href="#" className="px-8 py-3 font-semibold rounded-lg bg-[#00ffa6] dark:bg-violet-600 dark:text-gray-50">Back to homepage</Link >
            </div>
        </div>
    </section>
    
    );
};

export default ErrorPage;