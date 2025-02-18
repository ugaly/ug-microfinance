// import React, { useState, useEffect, useMemo } from 'react';
// import axios from 'axios';
// import PropTypes from 'prop-types';
// import {
//   Paper,
//   Table,
//   TableBody,
//   TableContainer,
//   TableCell,
//   TableHead,
//   TableRow,
//   Box,
//   Avatar,
// } from '@mui/material';
// import MainCard from 'components/MainCard';
// import ScrollX from 'components/ScrollX';
// import { CSVExport } from 'components/third-party/react-table';
// import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';

// // ==============================|| REACT TABLE ||============================== //

// function ReactTable({ columns, data }) {
//   const table = useReactTable({
//     data,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//   });

//   let headers = [];
//   table.getAllColumns().map((columns) =>
//     headers.push({
//       label: typeof columns.columnDef.header === 'string' ? columns.columnDef.header : '#',
//       key: columns.columnDef.accessorKey,
//     })
//   );

//   return (
//     <MainCard
//       content={false}
//       title="Loan Officer Performance"
//       secondary={<CSVExport {...{ data, headers, filename: 'loan-officer-performance.csv' }} />}
//     >
//       <ScrollX>
//         <TableContainer component={Paper} sx={{ maxHeight: 544 }}>
//           <Table stickyHeader>
//             <TableHead>
//               {table.getHeaderGroups().map((headerGroup) => (
//                 <TableRow key={headerGroup.id}>
//                   {headerGroup.headers.map((header) => (
//                     <TableCell key={header.id} {...header.column.columnDef.meta}>
//                       {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               ))}
//             </TableHead>
//             <TableBody>
//               {table.getRowModel().rows.map((row) => (
//                 <TableRow key={row.id}>
//                   {row.getVisibleCells().map((cell) => (
//                     <TableCell key={cell.id} {...cell.column.columnDef.meta}>
//                       {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </ScrollX>
//     </MainCard>
//   );
// }

// ReactTable.propTypes = {
//   columns: PropTypes.array,
//   data: PropTypes.array,
// };

// // ==============================|| LOAN OFFICER  PERFORMANCE SCREEN ||============================== //

// const LoanOfficerPerformanceScreen = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch data from API
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('http://185.241.151.38:9876/api/v1/loan-report/loan-officer', {
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${sessionStorage.getItem('serviceToken')}`,
//           },
//         });
//         setData(response.data.data);
//       } catch (err) {
//         setError(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   // Define columns for the table
 
// const columns = useMemo(
//     () => [
//       {
//         header: 'Avatar',
//         accessorKey: 'avatar',
//         cell: (cell) => {
//           const avatarUrl = cell.getValue();
//           const fullName = cell.row.original.fullName;
//           const initials = fullName ? fullName.charAt(0).toUpperCase() : '?';
  
//           return (
//             <Avatar
//               src={avatarUrl || undefined}
//               alt={fullName}
//               sx={{ width: 50, height: 50, fontSize: 20 }}
//             >
//               {!avatarUrl && initials}
//             </Avatar>
//           );
//         },
//       },
//       {
//         header: 'Full Name',
//         accessorKey: 'fullName',
//       },
//       {
//         header: 'Phone Number',
//         accessorKey: 'phoneNumber',
//       },
//       {
//         header: 'Total Active Loans',
//         accessorKey: 'totalActive',
//       },
//       {
//         header: 'Total Inactive Loans',
//         accessorKey: 'totalInActive',
//       },
//       {
//         header: 'Arrears',
//         accessorKey: 'arrears',
//         cell: (cell) => cell.getValue().length,
//       },
//     ],
//     []
//   );
  
//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error.message}</div>;

//   return (
//     <div>
//       {/* MainCard with Table */}
//       <MainCard content={false} title="Loan Officer Performance">
//         {/* Table */}
//         <ReactTable columns={columns} data={data} />
//       </MainCard>
//     </div>
//   );
// };

// export default LoanOfficerPerformanceScreen;



"use client"

import { useState, useEffect, useMemo } from "react"
import axios from "axios"
import PropTypes from "prop-types"
import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableCell,
  TableHead,
  TableRow,
  Box,
  Avatar,
  Collapse,
} from "@mui/material"
import MainCard from "components/MainCard"
import ScrollX from "components/ScrollX"
import { CSVExport } from "components/third-party/react-table"
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { baseUrl } from "Service/baseUrl"

// ==============================|| REACT TABLE ||============================== //

function ReactTable({ columns, data }) {
  const [expandedRow, setExpandedRow] = useState(null) // Track the expanded row
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  const toggleRowExpansion = (rowId) => {
    // Toggle expansion of a row
    setExpandedRow((prev) => (prev === rowId ? null : rowId))
  }

  const headers = []
  table.getAllColumns().map((columns) =>
    headers.push({
      label: typeof columns.columnDef.header === "string" ? columns.columnDef.header : "#",
      key: columns.columnDef.accessorKey,
    }),
  )

  return (
    <MainCard
      content={false}
      title="Loan Officer Performance"
      secondary={<CSVExport {...{ data, headers, filename: "loan-officer-performance.csv" }} />}
    >
      <ScrollX>
        <TableContainer component={Paper} sx={{ maxHeight: 544 }}>
          <Table stickyHeader>
            <TableHead>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableCell key={header.id} {...header.column.columnDef.meta}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>
            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <>
                  <TableRow key={row.id} onClick={() => toggleRowExpansion(row.id)} style={{ cursor: "pointer" }}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} {...cell.column.columnDef.meta}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                  {/* Expanded Row */}
                  {expandedRow === row.id && (
                    <TableRow key={`${row.id}-expanded`} sx={{ backgroundColor: "primary.lighter" }}>
                      <TableCell colSpan={row.getVisibleCells().length}>
                        <Collapse in={expandedRow === row.id}>
                          <Box p={2}>
                            <h4>Arrears Breakdown</h4>
                            <Table size="small">
                              <TableHead >
                                <TableRow>
                                  <TableCell>Category</TableCell>
                                  <TableCell>Total Loans</TableCell>
                                  <TableCell>Total Outstanding</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {row.original.arrears.map((arrear, index) => (
                                  <TableRow key={index}>
                                    <TableCell>{arrear.category}</TableCell>
                                    <TableCell>{arrear.totalLoans}</TableCell>
                                    <TableCell>{arrear.totalOutstanding}</TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </Box>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  )}
                </>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </ScrollX>
    </MainCard>
  )
}

ReactTable.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
}

// ==============================|| LOAN OFFICER PERFORMANCE SCREEN ||============================== //

const LoanOfficerPerformanceScreen = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}loan-report/loan-officer`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("serviceToken")}`,
          },
        })
        setData(response.data.data)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Define columns for the table
  const columns = useMemo(
    () => [
      {
        header: "Avatar",
        accessorKey: "avatar",
        cell: (cell) => {
          const avatarUrl = cell.getValue()
          const fullName = cell.row.original.fullName
          const initials = fullName ? fullName.charAt(0).toUpperCase() : "?"

          return (
            <Avatar src={avatarUrl || undefined} alt={fullName} sx={{ width: 30, height: 30, fontSize: 20 }}>
              {!avatarUrl && initials}
            </Avatar>
          )
        },
      },
      {
        header: "Full Name",
        accessorKey: "fullName",
      },
      {
        header: "Phone Number",
        accessorKey: "phoneNumber",
      },
      {
        header: "Total Active Loans",
        accessorKey: "totalActive",
      },
      {
        header: "Total Inactive Loans",
        accessorKey: "totalInActive",
      },
      {
        header: "Arrears",
        accessorKey: "arrears",
        cell: (cell) => cell.getValue().length,
      },
    ],
    [],
  )

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div>
      {/* MainCard with Table */}
      <MainCard content={false} title="Loan Officer Performance">
        {/* Table */}
        <ReactTable columns={columns} data={data} />
      </MainCard>
    </div>
  )
}

export default LoanOfficerPerformanceScreen

