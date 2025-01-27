import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { useTable, usePagination } from "react-table";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { MdViewKanban } from "react-icons/md";
import { Button, Dialog, DialogBody, DialogFooter, Progress, Table } from "@material-tailwind/react";
import Loder from "../Loder";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const TABLE_HEAD = ["S/N", "Pet Name", "Pet Category", "Pet Image", "Max Donation", "Donation Progress", "Actions"];

const MyDonationCampaign = () => {
    const { user, loading } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [data, setData] = useState([]);
    const [PaymentDetails, setPaymentDetails] = useState([]);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);

    const { data: info = [], refetch, isLoading } = useQuery({
        queryKey: [user?.email],
        queryFn: async () => {
            try {
                const { data } = await axiosSecure.get(`/donation/${user?.email}`);
                setData(data); // Update state directly here
                return data;
            } catch (error) {
                console.error('Error fetching data:', error);
                return []; // Return an empty array or handle error state
            }
        },
    });

    const handelarDetails = async (id) => {
        const { data } = await axiosSecure.get(`/paymentDetails/${id._id}`);
        setPaymentDetails(data);
    };

    const handleUpdateStatus = async (id, newStatus) => {
        try {
            await axiosSecure.patch(`/campaign/${id}`, { status: newStatus });
            const updatedData = data.map(item =>
                item._id === id ? { ...item, status: newStatus } : item
            );
            setData(updatedData);
            await refetch();
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const columns = React.useMemo(
        () => [
            {
                Header: "S/N",
                accessor: (row, i) => i + 1,
                Cell: ({ value }) => <div className="text-black">{value}.</div>,
            },
            {
                Header: "Pet Name",
                accessor: "petName",
                Cell: ({ value }) => <div className="text-black">{value}</div>,
            },
            {
                Header: "Pet Category",
                accessor: "category",
                Cell: ({ value }) => <div className="text-black">{value}</div>,
            },
            {
                Header: "Pet Image",
                accessor: "petImage",
                Cell: ({ value }) => (
                    <div className="flex items-center gap-3">
                        <img
                            src={value}
                            alt="Pet"
                            className="w-12 h-12 rounded-full object-cover"
                        />
                    </div>
                ),
            },
            {
                Header: "Max Donation",
                accessor: "maxDonate",
                Cell: ({ value }) => <div className="text-black">{value}</div>,
            },
            {
                Header: "View Donation",
                accessor: "viewDonation",
                Cell: ({ row }) => (
                    <div onClick={() => handelarDetails(row.original)} className="text-black text-2xl">
                        <MdViewKanban onClick={handleOpen} />
                    </div>
                ),
            },
            {
                Header: "Donation Progress",
                accessor: "donationProgress",
                Cell: ({ row }) => (
                    <div className="text-black">
                        <Progress value={(row.original.donate * parseFloat(row.original.maxDonate)) / 100} />
                    </div>
                ),
            },
            {
                Header: "Edit",
                accessor: "actions",
                Cell: ({ row }) => (
                    <div className="flex gap-2">
                        <Link to={`/dashboard/donationUpdate/${row.original._id}`} className="text-blue-500 border px-2 rounded-3xl hover:text-blue-700">
                            Update
                        </Link>
                    </div>
                ),
            },
            {
                Header: "Pause/Resume",
                accessor: "status", // Assuming 'status' is the key in your data that indicates if it's paused
                Cell: ({ row }) => (
                    <div className="flex gap-2">
                        {row.original.status ? (
                            // If status is true (paused), show the Resume button
                            <Button onClick={() => handleUpdateStatus(row.original._id, false)}>
                                Resume
                            </Button>
                        ) : (
                            // If status is false (not paused), show the Pause button
                            <Button onClick={() => handleUpdateStatus(row.original._id, true)}>
                                Pause
                            </Button>
                        )}
                    </div>
                ),
            },
        ],
        [data, refetch] // Ensure refetch function is included in dependencies
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        state: { pageIndex },
        previousPage,
        nextPage,
        gotoPage,
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0 },
        },
        usePagination
    );

    return (
        <div className="container mx-auto p-4">
            <Helmet><title>MyCampaign</title></Helmet>
            <div className="my-4 text-center">
                <h2 className="text-3xl font-semibold text-gray-900">Donation Details List</h2>
                <p>These are the details about your Donation list</p>
            </div>
            <div className="overflow-x-auto">
                {isLoading ? (
                    // Display loading skeletons
                    <Skeleton count={10} height={40} />
                ) : (
                    <table {...getTableProps()} className="min-w-full bg-white border border-gray-200">
                        <thead>
                            {headerGroups.map((headerGroup) => (
                                <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                                    {headerGroup.headers.map((column) => (
                                        <th
                                            {...column.getHeaderProps()}
                                            key={column.id}
                                            className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            {column.render("Header")}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody {...getTableBodyProps()} className="bg-white divide-y divide-gray-200">
                            {page.map((row) => {
                                prepareRow(row);
                                return (
                                    <tr {...row.getRowProps()} key={row.id}>
                                        {row.cells.map((cell) => (
                                            <td
                                                {...cell.getCellProps()}
                                                key={cell.column.id}
                                                className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                                            >
                                                {cell.render("Cell")}
                                            </td>
                                        ))}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}
            </div>
            <div className="flex items-center justify-between mt-4">
                <button
                    onClick={() => previousPage()}
                    disabled={!canPreviousPage}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50"
                >
                    Previous
                </button>
                <div className="flex items-center space-x-2">
                    {pageOptions.map((option) => (
                        <button
                            key={option}
                            onClick={() => gotoPage(option)}
                            className={`px-4 py-2 text-sm font-medium rounded-md ${option === pageIndex ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                }`}
                        >
                            {option + 1}
                        </button>
                    ))}
                </div>
                <button
                    onClick={() => nextPage()}
                    disabled={!canNextPage}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50"
                >
                    Next
                </button>
            </div>
            <Dialog open={open} handler={handleOpen}>
                <DialogBody>
                    <div className="text-center">
                        <h1>Payment Details</h1>
                    </div>
                    <div>
                        <table>
                            <thead>
                                <tr className="flex gap-6">
                                    <th>Img</th>
                                    <th>Price</th>
                                    <th>ID</th>
                                    {/* Add more table headers as needed */}
                                </tr>
                            </thead>
                            <tbody>
                                {PaymentDetails.map((payment) => (
                                    <tr className="flex gap-5" key={payment.id}>
                                        <td><img className="w-8 h-8 rounded-full" src={payment?.petImage} alt="" /></td>
                                        <td>{payment?.price}</td>
                                        <td>{payment?.transitionId}</td>
                                        {/* Add more table cells based on your data */}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </DialogBody>
                <DialogFooter>
                    <Button variant="text" color="primary" onClick={handleOpen} className="mr-1">
                        <span>Close</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </div>
    );
};

export default MyDonationCampaign;
