import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://adope-pates-sarver-site.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;