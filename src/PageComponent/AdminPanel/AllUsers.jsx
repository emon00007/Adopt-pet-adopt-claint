import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Button } from "@material-tailwind/react";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const [allDatas, setAllData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axiosSecure.get('/allUser');
                setAllData(res.data);
            } catch (error) {
                console.error("Error fetching all users:", error);
            }
        };
        fetchData();
    }, [axiosSecure]);

    const handelMakeAdmin = allData => {
        axiosSecure.patch(`/allUsers/admin/${allData._id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${allData._id} is an admin now!`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    // Update state to trigger re-render
                    setAllData(prevData => {
                        const updatedData = prevData.map(data => {
                            if (data._id === allData._id) {
                                return { ...data, role: 'admin' };
                            }
                            return data;
                        });
                        return updatedData;
                    });
                }
            })
            .catch(error => {
                console.error("Error making user admin:", error);
                // Optionally handle error display or logging
            });
    };

    return (
        <div>
            <Helmet><title>AllUser</title></Helmet>
            <div className="container p-2 mx-auto sm:p-4 dark:text-gray-800">
                <h2 className="mb-4 text-2xl font-semibold text-center leading-tight">All Users</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full text-xs">
                        <colgroup>
                            <col />
                            <col />
                            <col />
                            <col />
                            <col />
                            <col className="w-24" />
                        </colgroup>
                        <thead className="dark:bg-gray-300">
                            <tr className="text-left">
                                <th className="p-3">Serial no</th>
                                <th className="p-3">User</th>
                                <th className="p-3">Email</th>
                                <th className="p-3">Profile Photo</th>
                                <th className="p-3">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allDatas.map((allData, index) => (
                                <tr key={allData._id} className="border-b border-opacity-20 dark:border-gray-300 dark:bg-gray-50">
                                    <td className="p-3">{index + 1}</td>
                                    <td className="p-3">
                                        <p>{allData.name}</p>
                                    </td>
                                    <td className="p-3">
                                        <p>{allData.email}</p>
                                    </td>
                                    <td className="p-3">
                                        <img className="w-14 h-14 rounded-full" src={allData.photoURL} alt="" />
                                    </td>
                                    <td className="p-3 text-right">
                                        {allData.role === 'admin' ? 'Admin' : <Button onClick={() => handelMakeAdmin(allData)}>Make Admin</Button>}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AllUsers;
