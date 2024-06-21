// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../../Hooks/useAxiosSecure";

// import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@material-tailwind/react";
// import { useContext } from "react";
// import { AuthContext } from "../../AuthProvider/AuthProvider";

// const PaymentDetails = () => {
//     const { user } = useContext(AuthContext)
//     const axiosSecure = useAxiosSecure();
//     console.log(user);
//     const { data: payments = [] } = useQuery({
//         queryKey: ['payment', user?.email],
//         queryFn: async () => {
//             const res = await axiosSecure.get(`/payment/${user?.email}`);
//             return res.data;

//         }

//     });
//     console.log( user);

//     return (
//         <div>
//             <Typography variant="h4" gutterBottom>Total Payments: {Array.isArray(payments) ? payments.length : 0}</Typography>
//             <TableContainer component={Paper}>
//                 <Table>
//                     <TableHead>
//                         <TableRow>
//                             <TableCell>#</TableCell>
//                             <TableCell>Price</TableCell>
//                             <TableCell>Transaction ID</TableCell>
//                             <TableCell>Status</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {/* {Array.isArray(payments) && payments.map((payment, index) => (
//                             <TableRow key={payment._id}>
//                                 <TableCell component="th" scope="row">{index + 1}</TableCell>
//                                 <TableCell>${payment?.price}</TableCell>
//                                 <TableCell>{payment?.transactionId}</TableCell>
//                                 <TableCell>{payment?.status}</TableCell> {/* Assuming status is available in payment object */}
//                             </TableRow>
//                         ))} */}
//                     </TableBody>
//                 </Table>
//             </TableContainer>
//         </div>
//     );
    
// };

// export default PaymentDetails;

