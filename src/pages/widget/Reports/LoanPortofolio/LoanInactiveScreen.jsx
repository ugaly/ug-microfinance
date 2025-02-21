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
  Box,
  Pagination,
  Grid,
  Avatar,
} from '@mui/material';
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import { CSVExport } from 'components/third-party/react-table';
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
    <MainCard
      content={false}
      title="Loan List"
      secondary={<CSVExport {...{ data, headers, filename: 'loan-list.csv' }} />}
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
    </MainCard>
  );
}

ReactTable.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
};

// ==============================|| LOAN ACTIVE SCREEN ||============================== //

const LoanInactiveScreen = () => {
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
  const [totalPages, setTotalPages] = useState(1);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}loan/list/loans`, {
          params: filters,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('serviceToken')}`,
          },
        });
        setData(response.data.content);
        setTotalPages(response.data.totalPages);
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
      
      {
        header: "Avatar",
        accessorKey: "avatar",
        cell: (cell) => {
          const avatarUrl = cell.getValue()
          const fullName = cell.row.original.name
          const initials = fullName ? fullName.charAt(0).toUpperCase() : "?"

          return (
            <Avatar src={avatarUrl || undefined} alt={fullName} sx={{ width: 30, height: 30, fontSize: 20, backgroundColor: 'primary.main' }}>
              {!avatarUrl && initials}
            </Avatar>
          )
        },
      },
      
      {
        header: 'Name',
        accessorKey: 'name',
      },
      {
        header: 'Outstanding',
        accessorKey: 'principal',
      },
      {
        header: 'Pay Today',
        accessorKey: 'payToday',
      },
      {
        header: 'Loan Officer',
        accessorKey: 'loanOfficer',
      },
      {
        header: 'Pay Status',
        accessorKey: 'payStatus',
        cell: (cell) => {
          switch (cell.getValue()) {
            case 'Kamili':
              return <Chip color="success" label="Kamili" size="small" variant="light" />;
            case 'Pungufu':
              return <Chip color="warning" label="Pungufu" size="small" variant="light" />;
            default:
              return <Chip color="info" label="Unknown" size="small" variant="light" />;
          }
        },
      },
      {
        header: 'Product',
        accessorKey: 'productInfo',
      },
      {
        header: 'BanchName',
        accessorKey: 'officeName',
      },
      {
        header: 'District',
        accessorKey: 'officeDistrict',
      },
      {
        header: 'Region',
        accessorKey: 'officeRegion',
      },
      
    ],
    []
  );



  // Handle filter changes
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  // Handle pagination change
  const handlePageChange = (event, newPage) => {
    setFilters((prev) => ({ ...prev, page: newPage - 1 }));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {/* MainCard with Filters in Header */}
      <MainCard
        content={false}
        title="Loan List"
        secondary={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {/* Search Filter */}
            <TextField
              size="small"
              placeholder="Search..."
              value={filters.search || ''}
              onChange={(e) => handleFilterChange('search', e.target.value)}
            />

            {/* Status Dropdown */}
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Status</InputLabel>
              <Select
                value={filters.status || ''}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                label="Status"
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="ACTIVE">Active</MenuItem>
                <MenuItem value="APPROVED">Approved</MenuItem>
              </Select>
            </FormControl>

            {/* Product ID Dropdown */}
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Product ID</InputLabel>
              <Select
                value={filters.productId || ''}
                onChange={(e) => handleFilterChange('productId', e.target.value)}
                label="Product ID"
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="1">Product 1</MenuItem>
                <MenuItem value="2">Product 2</MenuItem>
              </Select>
            </FormControl>

            {/* Loan Officer Dropdown */}
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Loan Officer</InputLabel>
              <Select
                value={filters.loanOfficerId || ''}
                onChange={(e) => handleFilterChange('loanOfficerId', e.target.value)}
                label="Loan Officer"
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

        {/* Pagination */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Pagination
            count={totalPages}
            page={filters.page + 1}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      </MainCard>
    </div>
  );
};

export default LoanInactiveScreen;