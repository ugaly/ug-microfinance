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
  Checkbox,
  FormControlLabel,
  Tooltip,
  Typography,
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
      title="Revenue List"
      secondary={<CSVExport {...{ data, headers, filename: 'revenue-list.csv' }} />}
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

// ==============================|| REVENUE SCREEN ||============================== //

const InActiveExpenseScreen = () => {
  const [filters, setFilters] = useState({
    type: null,
    paymentCategory: null,
    paymentMethod: null,
    date: null,
    branchId: null,
    loanId: null,
    active: true,
    page: 0,
  });

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}transaction/list`, {
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
        header: 'Amount Paid',
        accessorKey: 'amountPaid',
      },
      // {
      //   header: 'Description',
      //   accessorKey: 'description',
      // },
      
{
  header: 'Description',
  accessorKey: 'description',
  cell: ({ getValue }) => {
    const rawValue = getValue();
    // Ensure we are working with a string
    const fullText = typeof rawValue === 'string' ? rawValue : '';
    const truncatedText = fullText.length > 20 ? `${fullText.substring(0, 20)}...` : fullText;
    return (
      <Tooltip title={fullText} arrow>
        <Typography variant="body2" noWrap>
          {truncatedText}
        </Typography>
      </Tooltip>
    );
  }
}
,
      {
        header: 'Receipt',
        accessorKey: 'receipt',
      },
      {
        header: 'Payer Name',
        accessorKey: 'payerName',
      },
      {
        header: 'Payment Date',
        accessorKey: 'paymentDateTime',
      },
      {
        header: 'Payment Method',
        accessorKey: 'payCateMethod',
      },
      {
        header: 'Cashier',
        accessorKey: 'cashier',
      },
      {
        header: 'Status',
        accessorKey: 'active',
        cell: (cell) => (
          <Chip
            color={cell.getValue() ? 'success' : 'error'}
            label={cell.getValue() ? 'Active' : 'Inactive'}
            size="small"
            variant="light"
          />
        ),
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
        title="Revenue List"
        secondary={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {/* Search Filter */}
            <TextField
              size="small"
              placeholder="Search..."
              value={filters.search || ''}
              onChange={(e) => handleFilterChange('search', e.target.value)}
            />

            {/* Type Dropdown */}
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Type</InputLabel>
              <Select
                value={filters.type || ''}
                onChange={(e) => handleFilterChange('type', e.target.value)}
                label="Type"
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="INCOME">Income</MenuItem>
                <MenuItem value="EXPENSE">Expense</MenuItem>
              </Select>
            </FormControl>

            {/* Payment Category Dropdown */}
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Payment Category</InputLabel>
              <Select
                value={filters.paymentCategory || ''}
                onChange={(e) => handleFilterChange('paymentCategory', e.target.value)}
                label="Payment Category"
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="REJESHO">Rejesho</MenuItem>
                <MenuItem value="MATUMIZI">Matumizi</MenuItem>
              </Select>
            </FormControl>

            {/* Payment Method Dropdown */}
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Payment Method</InputLabel>
              <Select
                value={filters.paymentMethod || ''}
                onChange={(e) => handleFilterChange('paymentMethod', e.target.value)}
                label="Payment Method"
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="CASH">Cash</MenuItem>
                <MenuItem value="M_PESA">M-Pesa</MenuItem>
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

            {/* Active Checkbox */}
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.active}
                  onChange={(e) => handleFilterChange('active', e.target.checked)}
                />
              }
              label="Active"
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

export default InActiveExpenseScreen