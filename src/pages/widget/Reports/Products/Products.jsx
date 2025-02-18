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
      title="Product List"
      secondary={<CSVExport {...{ data, headers, filename: 'product-list.csv' }} />}
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

// ==============================|| PRODUCT SCREEN ||============================== //

const ProductScreen = () => {
  const [filters, setFilters] = useState({
    name: null,
    payIn: null,
    branchId: null,
    freeze: false,
  });

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}office/list/office/products`, {
          params: filters,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('serviceToken')}`,
          },
        });
        setData(response.data.data);
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
        header: 'Name',
        accessorKey: 'name',
      },
      {
        header: 'Pay In',
        accessorKey: 'payIn',
      },
      {
        header: 'Max Tenure',
        accessorKey: 'maxTenure',
      },
      {
        header: 'Principal Rate',
        accessorKey: 'principalRate',
      },
      {
        header: 'Processing Rate',
        accessorKey: 'processingRate',
      },
      {
        header: 'Status',
        accessorKey: 'freeze',
        cell: (cell) => (
          <Chip
            color={cell.getValue() ? 'error' : 'success'}
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {/* MainCard with Filters in Header */}
      <MainCard
        content={false}
        title="Product List"
        secondary={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {/* Search Filter */}
            <TextField
              size="small"
              placeholder="Search by Name..."
              value={filters.name || ''}
              onChange={(e) => handleFilterChange('name', e.target.value)}
            />

            {/* Pay In Dropdown */}
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Pay In</InputLabel>
              <Select
                value={filters.payIn || ''}
                onChange={(e) => handleFilterChange('payIn', e.target.value)}
                label="Pay In"
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="Siku">Siku</MenuItem>
                <MenuItem value="Wiki">Wiki</MenuItem>
                <MenuItem value="Miezi">Miezi</MenuItem>
              </Select>
            </FormControl>

            {/* Freeze Checkbox */}
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.freeze}
                  onChange={(e) => handleFilterChange('freeze', e.target.checked)}
                />
              }
              label="Frozen"
            />
          </Box>
        }
      >
        {/* Table */}
        <ReactTable columns={columns} data={data} />
      </MainCard>
    </div>
  );
};

export default ProductScreen;