import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Button } from "@material-tailwind/react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const AllPets = () => {
    const axiosSecure = useAxiosSecure();
    const [allPets, setAllPets] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const res = await axiosSecure.get('/allPets');
            setAllPets(res.data);
        };
        fetchData();
    }, [axiosSecure]);

    const HandelDeletePets = allPet => {
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

                axiosSecure.delete(`/allPets/${allPet._id}`)
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
            <Helmet><title>AllPets</title></Helmet>
            <h2 className="mb-4 text-2xl font-semibold leading-tight">Contacts</h2>
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
                            allPets.map((allPet, index) => (
                                <tr key={allPet?._id}>
                                    <td className="p-3">{index + 1}</td>
                                    <td className="px-3 py-2">
                                    {allPet?.petName}
                                    </td>
                                    <td className="px-3 py-2">
                                       <img className="w-12 h-12 rounded-full" src={allPet?.petImage} alt="" />
                                       
                                    </td>
                                    <td className="px-3 py-2">
                                        <Button onClick={()=>HandelDeletePets(allPet)}>Delete</Button>
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

export default AllPets;