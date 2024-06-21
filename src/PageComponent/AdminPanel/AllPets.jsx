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
            try {
                const res = await axiosSecure.get('/allPets');
                setAllPets(res.data);
            } catch (error) {
                console.error("Error fetching all pets:", error);
            }
        };
        fetchData();
    }, [axiosSecure]);
    const handleAdopt = (id) => {
        axiosSecure.patch(`/adopt/${id}`, { adopted: true })
            .then(() => {
                setAllPets(prevPets =>
                    prevPets.map(pet =>
                        pet._id === id ? { ...pet, adopted: true } : pet
                    )
                );
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your Pets Adopets success",
                    showConfirmButton: false,
                    timer: 1500
                });
            })
            .catch(error => console.error('Error adopting pet:', error));
    };


    const handleDeletePets = (allPet) => {
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
                                text: "Your pet has been deleted.",
                                icon: "success"
                            });
                            // Update the state to reflect the deletion
                            setAllPets(prevPets => prevPets.filter(pet => pet._id !== allPet._id));
                        }
                    })
                    .catch(error => {
                        console.error("Error deleting pet:", error);
                        Swal.fire({
                            title: "Error!",
                            text: "Failed to delete pet.",
                            icon: "error"
                        });
                    });
            }
        });
    };

    return (
        <div className="container p-2 mx-auto sm:p-4 dark:text-gray-800">
            <Helmet>
                <title>AllPets</title>
            </Helmet>
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
                            <th className="p-3">Update</th>
                            <th className="p-3">State</th>
                        </tr>
                    </thead>
                    <tbody className="border-b dark:bg-gray-50 dark:border-gray-300">
                        {allPets.map((allPet, index) => (
                            <tr key={allPet?._id}>
                                <td className="p-3">{index + 1}</td>
                                <td className="px-3 py-2">{allPet?.petName}</td>
                                <td className="px-3 py-2">
                                    <img
                                        className="w-12 h-12 rounded-full"
                                        src={allPet?.petImage}
                                        alt={allPet?.petName}
                                    />
                                </td>
                                <td className="px-3 py-2">
                                    <Button onClick={() => handleDeletePets(allPet)}>Delete</Button>
                                </td>
                                <td className="px-3 py-2">
                                    <Link to={`UpdatePage/${allPet._id}`}>
                                        <Button>Update</Button>
                                    </Link>
                                </td>
                                <td className="px-3 py-2">
                                <button
                            onClick={() => handleAdopt(allPet._id)}
                            className={`text-green-500 border px-2 rounded-3xl hover:text-green-700 ${allPet.adopted ? "opacity-50 cursor-not-allowed" : ""
                                }`}
                            disabled={allPet.adopted}
                        >
                            Adopt
                        </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllPets;
