
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
      title="Staff List"
      secondary={<CSVExport {...{ data, headers, filename: 'staff-list.csv' }} />}
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

// ==============================|| STAFF SCREEN ||============================== //

const InActiveStaffScreen = () => {
  const [filters, setFilters] = useState({
    branchId: null,
    canReport: false,
    page: 0,
    addLoan: false,
    canApprove: false,
    canApproveBig: false,
    canMakeTransaction: false,
    isStaff: false,
    active: false,
  });

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}office/list/office/users`, {
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
        header: 'Username',
        accessorKey: 'username',
      },
      {
        header: 'Full Name',
        accessorKey: 'fullName',
      },
      {
        header: 'Group',
        accessorKey: 'group',
      },
      {
        header: 'Status',
        accessorKey: 'deleted',
        cell: (cell) => (
          <Chip
            color={cell.getValue() ? 'error' : 'success'}
            label={cell.getValue() ? 'Deleted' : 'Active'}
            size="small"
            variant="light"
          />
        ),
      },
      {
        header: 'Frozen',
        accessorKey: 'frozen',
        cell: (cell) => (
          <Chip
            color={cell.getValue() ? 'warning' : 'success'}
            label={cell.getValue() ? 'Frozen' : 'Active'}
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
        title="Staff List"
        secondary={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {/* Search Filter */}
            <TextField
              size="small"
              placeholder="Search..."
              value={filters.search || ''}
              onChange={(e) => handleFilterChange('search', e.target.value)}
            />

            {/* Boolean Filters */}
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.canReport}
                  onChange={(e) => handleFilterChange('canReport', e.target.checked)}
                />
              }
              label="Can Report"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.addLoan}
                  onChange={(e) => handleFilterChange('addLoan', e.target.checked)}
                />
              }
              label="Add Loan"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.canApprove}
                  onChange={(e) => handleFilterChange('canApprove', e.target.checked)}
                />
              }
              label="Can Approve"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.canApproveBig}
                  onChange={(e) => handleFilterChange('canApproveBig', e.target.checked)}
                />
              }
              label="Can Approve Big"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.canMakeTransaction}
                  onChange={(e) => handleFilterChange('canMakeTransaction', e.target.checked)}
                />
              }
              label="Can Make Transaction"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.isStaff}
                  onChange={(e) => handleFilterChange('isStaff', e.target.checked)}
                />
              }
              label="Is Staff"
            />
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

export default InActiveStaffScreen;