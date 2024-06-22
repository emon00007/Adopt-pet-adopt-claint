import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { RxCross1 } from "react-icons/rx";
import { BiSolidSelectMultiple } from "react-icons/bi";
import { Button } from "@material-tailwind/react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";

const AdopRequest = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
   const axiosPublic=useAxiosPublic()
    const [adopRequest, setAdopRequest] = useState([]);
    const [adoptChack, setAdoptchack] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await axiosSecure.get(`/petaddRequest/${user?.email}`);
            setAdopRequest(res.data);
            console.log(res.data);
        };
        fetchData();
    }, [user, axiosSecure]);

    useEffect(() => {
        fetch('https://adope-pates-sarver-site.vercel.app/petlisting')
            .then(res => res.json())
            .then(data => {
                setAdoptchack(data);
            });
    }, []);


    const handleAdopt = async (adopReq) => {
        console.log('Handle Adopt Clicked');
        console.log('adopReq:', adopReq);
        const pet = adoptChack.find(adoptChack => adoptChack._id === adopReq.petId);
        console.log('Pet found:', pet);
        if (pet) {
            const updatedRequest = { ...adopReq, adopted: true };
            try {
                await axiosSecure.patch(`/petaddRequeste/${adopReq.petId}`, updatedRequest);
                setAdopRequest(adopRequest.map(req => req._id === adopReq._id ? updatedRequest : req));
            } catch (error) {
                console.error('Failed to update the adoption request:', error);
            }
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Adoped soccess",
                showConfirmButton: false,
                timer: 1500
              });
        }
    };
    const handelReject = async (adopReq) => {
        console.log('Handle Adopt Clicked');
        console.log('adopReq:', adopReq);
        const pet = adoptChack.find(adoptChack => adoptChack._id === adopReq.petId);
        console.log('Pet found:', pet);
        if (pet) {
            const updatedRequest = { ...adopReq, adopted: "reject" };
            try {
                await axiosSecure.patch(`/petaddRequeste/${adopReq.petId}`, updatedRequest);
                setAdopRequest(adopRequest.map(req => req._id === adopReq._id ? updatedRequest : req));
            } catch (error) {
                console.error('Failed to update the adoption request:', error);
            }
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Reject Done ",
                showConfirmButton: false,
                timer: 1500
              });
        }
    };

    console.log('adoptChack:', adoptChack);
    console.log('adopRequest:', adopRequest);
    console.log(adoptChack);
    console.log(adopRequest);
 

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
                            <th className="p-3">Image</th>
                            <th className="p-3">Pet Name</th>
                            <th className="p-3">Name</th>
                            <th className="p-3">Email</th>
                            <th className="p-3">Phone</th>
                            <th className="p-3">Address</th>
                            <th className="p-3">Accept</th>
                            <th className="p-3">Reject</th>
                        </tr>
                    </thead>
                    <tbody className="border-b dark:bg-gray-50 dark:border-gray-300">
                        {adopRequest.map((adopReq, index) => (
                            <tr key={adopReq?._id}>
                                <td className="p-3">{index + 1}</td>
                                <td className="px-3 py-2">
                                    <img className="w-12 h-12 rounded-full" src={adopReq?.petImage} alt="" />
                                </td>
                                <td className="px-3 py-2">
                                    {adopReq?.petName}
                                </td>
                                <td className="px-3 py-2">
                                    {adopReq?.userEmail}
                                </td>
                                <td className="px-3 py-2">
                                    {adopReq?.phoneNumber}
                                </td>
                                <td className="px-3 py-2">
                                    {adopReq?.location}
                                </td>
                                <td className="px-3 py-2">
                                    <Button onClick={() => handleAdopt(adopReq)}>
                                        <BiSolidSelectMultiple />
                                    </Button>
                                </td>
                                <td className="px-3 py-2">
                                    <Button onClick={() => handelReject(adopReq)}><RxCross1 /></Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdopRequest;
