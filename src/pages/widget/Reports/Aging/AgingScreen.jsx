import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableCell,
  TableHead,
  TableRow,
  Box,
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
      title="Aging Report"
      secondary={<CSVExport {...{ data, headers, filename: 'aging-report.csv' }} />}
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

// ==============================|| AGING SCREEN ||============================== //

const AgingScreen = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}loan-report/aging`, {
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
  }, []);

  // Define columns for the table
  const columns = useMemo(
    () => [
      {
        header: 'Category',
        accessorKey: 'category',
      },
      {
        header: 'Name',
        accessorKey: 'name',
      },
      {
        header: 'Total Loans',
        accessorKey: 'totalLoans',
      },
      {
        header: 'Total Payment',
        accessorKey: 'totalPayment',
      },
      {
        header: 'Total Outstanding',
        accessorKey: 'totalOutstanding',
      },
      {
        header: 'Total Disburse',
        accessorKey: 'totalDisburse',
      },
    ],
    []
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {/* MainCard with Table */}
      <MainCard content={false} title="Aging Report">
        {/* Table */}
        <ReactTable columns={columns} data={data} />
      </MainCard>
    </div>
  );
};

export default AgingScreen;