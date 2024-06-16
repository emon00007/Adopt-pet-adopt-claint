import { useContext } from "react";
import useAxiosSecure from "./useAxiosSecure";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const useUser = () => {
    const { user, loading } = useContext(AuthContext)
    const axiosSecure = useAxiosSecure();
    const { data: isUser, isLoading: isUserLoading } = useQuery({
        queryKey: [user?.email, 'isUser'],
        queryFn: async () => {
            if (user?.email) {
                const res = await axiosSecure.get(`/users/User/${user.email}`);
                return res.data?.user;
            }
            return false;
        },
        enabled: !!user && !loading,
    });
    return [isUser, isUserLoading]
};

export default useUser;