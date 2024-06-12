import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

const AllDonates = () => {
    const axiosSecure = useAxiosSecure();
    const [allDonations, setAllDonate] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const res = await axiosSecure.get('/allDonation');
            setAllDonate(res.data);
        };
        fetchData();
    }, [axiosSecure]);

    const HandelDeleteDonation = allDonation => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/allDonation/${allDonation._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }
    return (
        <div className="container p-2 mx-auto sm:p-4 dark:text-gray-800">
            <Helmet><title>AllDonation</title></Helmet>

            <div className="overflow-x-auto">
                <table className="w-full p-6 text-xs text-left whitespace-nowrap">
                    <colgroup>
                        <col className="w-5" />
                        <col />
                        <col />
                        <col />
                        <col />
                        <col />
                        <col className="w-5" />
                    </colgroup>
                    <thead>
                        <tr className="dark:bg-gray-300">
                            <th className="p-3">Serial No</th>
                            <th className="p-3">Pet Name</th>
                            <th className="p-3">Pet Image</th>
                            <th className="p-3">Delete</th>
                            <th className="p-3">Update </th>
                            <th className="p-3">State </th>

                        </tr>
                    </thead>
                    <tbody className="border-b dark:bg-gray-50 dark:border-gray-300">
                        {
                            allDonations.map((allDonation, index) => (
                                <tr key={allDonation?._id}>
                                    <td className="p-3">{index + 1}</td>
                                    <td className="px-3 py-2">
                                    {allDonation?.petName}
                                    </td>
                                    <td className="px-3 py-2">
                                       <img className="w-12 h-12 rounded-full" src={allDonation?.petImage} alt="" />
                                       
                                    </td>
                                    <td className="px-3 py-2">
                                        <Button onClick={()=>HandelDeleteDonation(allDonation)}>Delete</Button>
                                    </td>
                                    <td className="px-3 py-2">
                                        <Link to="/UpdatePage"><Button>Update</Button></Link>
                                    </td>
                                    <td className="px-3 py-2">
                                       <Button>Adopted</Button>
                                        
                                    </td>
                                  
                                </tr>
                            ))
                        }

                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default AllDonates;