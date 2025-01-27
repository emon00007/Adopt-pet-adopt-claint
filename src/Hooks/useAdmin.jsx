import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import useAxiosSecure from "./useAxiosSecure";
import { AuthContext } from "../AuthProvider/AuthProvider";


const useAdmin = () => {
    const { user, loading } = useContext(AuthContext)
    const axiosSecure = useAxiosSecure();
    const { data: isAdmin, isLoading: isAdminLoading } = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        enabled: !!user && !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/admin/${user.email}`);
            return res.data?.admin || false;
        }
    });
    return [isAdmin, isAdminLoading]
};

export default useAdmin;