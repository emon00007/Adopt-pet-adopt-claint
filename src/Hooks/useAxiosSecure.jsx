import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";

const axiosSecure = axios.create({
    baseURL: 'https://adope-pates-sarver-site.vercel.app'
})
const useAxiosSecure = () => {
    const navigate = useNavigate()
    const { LogOut } = useContext(AuthContext)
    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token')
        // console.log("request stopped by interCeptor", token)
        config.headers.authorization = `Bearer ${token}`
        return config
    }, function (error) {
        return Promise.reject(error)
    })
    axiosSecure.interceptors.response.use(function (response) {
        return response
    }, async (error) => {
        const status = error.response ? error.response.status : null;
        console.log('status error in the interCeptor', error)
        if (status === 401 || status === 403) {
            await LogOut()
            navigate('/Login')
        }
        return Promise.reject(error)
    });
    return axiosSecure;
};

export default useAxiosSecure;