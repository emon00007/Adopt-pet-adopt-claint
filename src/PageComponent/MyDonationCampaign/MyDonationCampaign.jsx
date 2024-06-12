import { useContext, useEffect, useMemo, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { useTable, usePagination } from "react-table";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

const TABLE_HEAD = ["S/N", "Pet Name", "Pet Category", "Pet Image", "Adoption Status", "Actions"];
console.log(TABLE_HEAD);



const MyDonationCampaign = () => {
    const { user } = useContext(AuthContext);
    const [addpet, setAddpet] = useState([]);

    const { id } = useParams();
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`http://localhost:5000/mypetlisting/${user?.email}`);
            const result = await res.json();
            setAddpet(result);
        };

        fetchData();
    }, [user]);

    const handleAdopt = async (id) => {

        await axios.patch(`http://localhost:5000/adopt/${id}`, { adopted: true });
        setAddpet((prevPets) =>
            prevPets.map((pet) =>
                pet._id === id ? { ...pet, adopted: true } : pet
            )
        );
    }

    const handleDelete = (_id) => {
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

                axios.delete(`http://localhost:5000/delete/${_id}`)
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

    };

    const columns = useMemo(
        () => [
            {
                Header: "S/N",
                accessor: (row, i) => i + 1,
                Cell: ({ value }) => <div className="text-black">{value}</div>,
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
                Header: "Adoption Status",
                accessor: "adopted",
                Cell: ({ value }) => (
                    <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${value
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                            }`}
                    >
                        {value ? "Adopted" : "Not Adopted"}
                    </span>
                ),
            },
            {
                Header: "Actions",
                accessor: "actions",
                Cell: ({ row }) => (
                    <div className="flex gap-2">
                        <button onClick={() => handleDelete(row.original._id)} className="text-red-500 border px-2  rounded-3xl hover:text-red-700">
                            Delete
                        </button>
                        <Link to='/UpdatePage' className="text-blue-500 border px-2 rounded-3xl hover:text-blue-700">
                            Update
                        </Link>
                        <button
                            onClick={() => handleAdopt(row.original._id)}
                            className={`text-green-500 border px-2 rounded-3xl hover:text-green-700 ${row.original.adopted ? "opacity-50 cursor-not-allowed" : ""
                                }`}
                            disabled={row.original.adopted}
                        >
                            Adopt
                        </button>
                    </div>
                ),
            },
        ],
        []
    );

    const data = useMemo(() => addpet, [addpet]);

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
            <div className="my-4 text-center ">
                <h2 className="text-3xl font-semibold  text-gray-900">Pet Listings</h2>
                <p className="">These are the details about your pet listings</p>
            </div>
            <div className="overflow-x-auto">
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
        </div>
    );
};

export default MyDonationCampaign;