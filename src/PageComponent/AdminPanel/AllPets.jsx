import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

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
    return (
        <div className="container p-2 mx-auto sm:p-4 dark:text-gray-800">
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
                                       <img src="" alt="" />
                                       
                                    </td>
                                    <td className="px-3 py-2">
                                        <p>555-873-9812</p>
                                    </td>
                                    <td className="px-3 py-2">
                                        <p>dwight@adams.com</p>
                                    </td>
                                    <td className="px-3 py-2">
                                        <p>71 Cherry Court, SO</p>
                                        <p className="dark:text-gray-600">United Kingdom</p>
                                    </td>
                                    <td className="px-3 py-2">
                                        <button type="button" title="Open details" className="p-1 rounded-full dark:text-gray-400 hover:dark:bg-gray-300 focus:dark:bg-gray-300">
                                            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                                                <path d="M12 6a2 2 0 110-4 2 2 0 010 4zm0 8a2 2 0 110-4 2 2 0 010 4zm-2 6a2 2 0 104 0 2 2 0 00-4 0z"></path>
                                            </svg>
                                        </button>
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