// import React, { useState, useEffect, useMemo } from 'react';
// import axios from 'axios';
// import PropTypes from 'prop-types';
// import { Chip, Paper, Table, TableBody, TableContainer, TableCell, TableHead, TableRow, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
// import MainCard from 'components/MainCard';
// import ScrollX from 'components/ScrollX';
// import { CSVExport } from 'components/third-party/react-table';
// import LinearWithLabel from 'components/@extended/progress/LinearWithLabel';
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
//       title="Loan Portfolio"
//       secondary={<CSVExport {...{ data, headers, filename: 'loan-portfolio.csv' }} />}
//     >
//     <MainCard
//       content={false}
//       title="Loan Portfolio"
//       secondary={<CSVExport {...{ data, headers, filename: 'loan-portfolio.csv' }} />}
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
//     </MainCard>
//   );
// }

// ReactTable.propTypes = {
//   columns: PropTypes.array,
//   data: PropTypes.array,
// };

// // ==============================|| LOAN PORTFOLIO SCREEN ||============================== //

// const LoanPortfolioScreen = () => {
//   const [filters, setFilters] = useState({
//     branchId: null,
//     status: null,
//     page: 0,
//     search: null,
//     productId: null,
//     loanOfficerId: null,
//     date: null,
//   });

//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch data from API
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('http://185.241.151.38:9876/api/v1/loan-report/portfolio', {
//           params: filters,
//         },
//         {
//             headers: {
//                 'Content-Type': 'application/json',
//                 Authorization: `Bearer ${sessionStorage.getItem('serviceToken')}`
//               }
//         });
//         setData(response.data.content);
//       } catch (err) {
//         setError(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [filters]);

//   // Define columns for the table
//   const columns = useMemo(
//     () => [
//       {
//         header: 'Full Name',
//         accessorKey: 'fullName',
//       },
//       {
//         header: 'Phone Number',
//         accessorKey: 'phoneNumber',
//       },
//       {
//         header: 'Loan Amount',
//         accessorKey: 'loanAmount',
//       },
//       {
//         header: 'Interest Rate',
//         accessorKey: 'interestRate',
//         cell: (cell) => `${cell.getValue()}%`,
//       },
//       {
//         header: 'Balance',
//         accessorKey: 'balance',
//       },
//       {
//         header: 'Status',
//         accessorKey: 'status',
//         cell: (cell) => {
//           switch (cell.getValue()) {
//             case 'ACTIVE':
//               return <Chip color="success" label="Active" size="small" variant="light" />;
//             case 'APPROVED':
//               return <Chip color="info" label="Approved" size="small" variant="light" />;
//             default:
//               return <Chip color="warning" label="Unknown" size="small" variant="light" />;
//           }
//         },
//       },
//       {
//         header: 'Loan Officer',
//         accessorKey: 'loanOfficer',
//       },
//       {
//         header: 'Branch',
//         accessorKey: 'branch',
//       },
//     ],
//     []
//   );

//   // Handle filter changes
//   const handleFilterChange = (key, value) => {
//     setFilters((prev) => ({ ...prev, [key]: value }));
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error.message}</div>;

//   return (
//     <div>
//       {/* Filter UI */}
//       <FormControl fullWidth sx={{ mb: 2 }}>
//         <InputLabel>Status</InputLabel>
//         <Select
//           value={filters.status || ''}
//           onChange={(e) => handleFilterChange('status', e.target.value)}
//           label="Status"
//         >
//           <MenuItem value="">All</MenuItem>
//           <MenuItem value="ACTIVE">Active</MenuItem>
//           <MenuItem value="APPROVED">Approved</MenuItem>
//         </Select>
//       </FormControl>

//       {/* Table */}
//       <ReactTable columns={columns} data={data} />
//     </div>
//   );
// };

// export default LoanPortfolioScreen;










import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import {
    Chip,
    Paper,
    Table,
    TableBody,
    TableContainer,
    TableCell,
    TableHead,
    TableRow,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    TextField,
    Grid,
    Box,
    Typography,
    Avatar,
} from '@mui/material';
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import { CSVExport, DebouncedInput } from 'components/third-party/react-table';
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { baseUrl } from 'Service/baseUrl';

// ==============================|| REACT TABLE ||============================== //

function ReactTable({ columns, data }) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    let headers = [];
    table.getAllColumns().map((columns) =>
        headers.push({
            label: typeof columns.columnDef.header === 'string' ? columns.columnDef.header : '#',
            key: columns.columnDef.accessorKey,
        })
    );

    return (
        // <MainCard
        //   content={false}
        //   title="Loan Portfolio"
        //   secondary={
        //     <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        //       <CSVExport {...{ data, headers, filename: 'loan-portfolio.csv' }} />
        //     </Box>
        //   }
        // >
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
                            <TableRow key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id} {...cell.column.columnDef.meta}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </ScrollX>
        // </MainCard>
    );
}

ReactTable.propTypes = {
    columns: PropTypes.array,
    data: PropTypes.array,
};

// ==============================|| LOAN PORTFOLIO SCREEN ||============================== //

const LoanPortfolioScreen = () => {
    const [filters, setFilters] = useState({
        branchId: null,
        status: null,
        page: 0,
        search: null,
        productId: null,
        loanOfficerId: null,
        date: null,
    });

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch data from API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${baseUrl}loan-report/portfolio`, {
                    params: filters,
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${sessionStorage.getItem('serviceToken')}`,
                    },
                });
                setData(response.data.content);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [filters]);

    // Define columns for the table
    const columns = useMemo(
        () => [
            // {
            //     header: 'Full Name',
            //     accessorKey: 'fullName',
            // },
            {
                header: 'Full Name',
                accessorKey: 'fullName',
                cell: ({ getValue }) => {
                    const fullName = getValue();
                    const initial = fullName ? fullName.charAt(0).toUpperCase() : '';
                    return (
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar sx={{ width: 24, height: 24, fontSize: 16, fontWeight: 500, marginRight: 1, padding: 2, backgroundColor: 'primary.main' }}>
                                {initial}
                            </Avatar>
                            {fullName}
                        </div>
                    );
                },
            },
            {
                header: 'Phone Number',
                accessorKey: 'phoneNumber',
            },
            {
                header: 'Loan Amount',
                accessorKey: 'loanAmount',
            },
            {
                header: 'Interest Rate',
                accessorKey: 'interestRate',
                cell: (cell) => `${cell.getValue()}%`,
            },
            {
                header: 'Balance',
                accessorKey: 'balance',
            },
            {
                header: 'Status',
                accessorKey: 'status',
                cell: (cell) => {
                    switch (cell.getValue()) {
                        case 'ACTIVE':
                            return <Chip color="success" label="Active" size="small" variant="light" />;
                        case 'APPROVED':
                            return <Chip color="info" label="Approved" size="small" variant="light" />;
                        default:
                            return <Chip color="warning" label="Unknown" size="small" variant="light" />;
                    }
                },
            },
            // {
            //     header: 'Loan Officer',
            //     accessorKey: 'loanOfficer',
            // },
            // {
            //     header: 'Branch',
            //     accessorKey: 'branch',
            //     cell: ({ getValue }) => {
            //         const branch = getValue();
            //         return branch ? branch : 'N/A'; // Display 'N/A' if branch is null
            //     },
            // },
            
        ],
        []
    );

    // Handle filter changes
    const handleFilterChange = (key, value) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;





    let headers = [];





    return (
        <div>
            <MainCard
                content={false}
                title="Loan Portfolio"
                secondary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <CSVExport {...{ data, headers, filename: 'loan-portfolio.csv' }} />
                    </Box>
                }
            >
                <MainCard
                    content={false}
                    title={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            {/* Search Filter */}
                            <DebouncedInput
                                size="small"
                                placeholder="Search..."
                                value={filters.search || ''}
                                onFilterChange={(value) => handleFilterChange('search', String(value))}
                            //   onChange={(e) => handleFilterChange('search', e.target.value)}
                            />
                        </Box>
                    }
                    secondary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            {/* Search Filter */}
                            {/* <TextField
                            size="small"
                            placeholder="Search..."
                            value={filters.search || ''}
                            onChange={(e) => handleFilterChange('search', e.target.value)}
                            /> */}

                            {/* Status Dropdown */}
                            <FormControl size="small" sx={{ minWidth: 120 }}>
                                {/* <InputLabel>Status</InputLabel> */}
                                {/* <Select
                                    value={filters.status || ''}
                                    onChange={(e) => handleFilterChange('status', e.target.value)}
                                    label="Status"
                                >
                                    <MenuItem value="">All</MenuItem>
                                    <MenuItem value="ACTIVE">Active</MenuItem>
                                    <MenuItem value="APPROVED">Approved</MenuItem>
                                </Select> */}

                                <Select
                                    value={filters.status || ''}
                                    onChange={(e) => handleFilterChange('status', e.target.value)}
                                    // label="Status"
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Without label' }}
                                    renderValue={(selected) => {
                                        if (!selected) {
                                            return <Typography variant="subtitle1">Status</Typography>;
                                        }

                                        return <Typography variant="subtitle2">{selected}</Typography>;
                                    }}
                                >
                                    <MenuItem value="">All</MenuItem>
                                    <MenuItem value="ACTIVE">Active</MenuItem>
                                    <MenuItem value="APPROVED">Approved</MenuItem>
                                </Select>


                            </FormControl>

                            <FormControl size="small" sx={{ minWidth: 120 }}>
                                <Select
                                    value={filters.productId || ''}
                                    onChange={(e) => handleFilterChange('productId', e.target.value)}
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Without label' }}
                                    renderValue={(selected) => {
                                        if (!selected) {
                                            return <Typography variant="subtitle1">roduct ID</Typography>;
                                        }

                                        return <Typography variant="subtitle2">{selected}</Typography>;
                                    }}
                                >
                                    <MenuItem value="">All</MenuItem>
                                    <MenuItem value="1">Product 1</MenuItem>
                                    <MenuItem value="2">Product 2</MenuItem>
                                </Select>
                            </FormControl>

                            {/* Loan Officer Dropdown */}
                            <FormControl size="small" sx={{ minWidth: 120 }}>


                                <Select
                                    value={filters.loanOfficerId || ''}
                                    onChange={(e) => handleFilterChange('loanOfficerId', e.target.value)}
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Without label' }}
                                    renderValue={(selected) => {
                                        if (!selected) {
                                            return <Typography variant="subtitle1">Loan Officer</Typography>;
                                        }

                                        return <Typography variant="subtitle2">{selected}</Typography>;
                                    }}
                                >
                                    <MenuItem value="">All</MenuItem>
                                    <MenuItem value="1">Officer 1</MenuItem>
                                    <MenuItem value="2">Officer 2</MenuItem>
                                </Select>
                            </FormControl>

                            {/* Date Picker */}
                            <TextField
                                size="small"
                                type="date"
                                label="Date"
                                InputLabelProps={{ shrink: true }}
                                value={filters.date || ''}
                                onChange={(e) => handleFilterChange('date', e.target.value)}
                            />
                        </Box>
                    }
                >
                    {/* Table */}
                    <ReactTable columns={columns} data={data} />
                </MainCard>
            </MainCard>
        </div>
    );
};

export default LoanPortfolioScreen;