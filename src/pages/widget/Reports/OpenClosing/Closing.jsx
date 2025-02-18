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
      title="Closing Report"
      secondary={<CSVExport {...{ data, headers, filename: 'closing-report.csv' }} />}
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

// ==============================|| CLOSING SCREEN ||============================== //

const ClosingScreen = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}loan-report/closing`, {
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
        header: 'Date',
        accessorKey: 'date',
        
      },
      {
        header: 'Opening',
        accessorKey: 'opening',
        meta: {
          sx: {  textAlign: 'right' }, // Applies border to the entire column
        },
      },
      {
        header: 'Mtaji',
        accessorKey: 'capital',
        meta: {
          sx: {  textAlign: 'right' }, // Applies border to the entire column
        },
      },
      {
        header: 'Rejesho',
        accessorKey: 'loanPayments',
        meta: {
          sx: {  textAlign: 'right' }, // Applies border to the entire column
        },
      },
      {
        header: 'Fomu',
        accessorKey: 'loanProcessing',
        size: 150, // Ensure column width for visibility
        meta: {
          sx: {  textAlign: 'right' }, // Applies border to the entire column
        },
       
      },

      {
        header: 'VAT',
        accessorKey: 'vat',
        meta: {
          sx: {  textAlign: 'right' }, // Applies border to the entire column
        },
      },
    
      {
        header: 'Zidi',
        accessorKey: 'zidi',
       
        meta: {
          sx: {  textAlign: 'right',  }, // Applies border to the entire column
        },
      },
      {
        header: 'Others',
        accessorKey: 'othersCost',
        meta: {
          sx: {  textAlign: 'right' }, // Applies border to the entire column
        },
      },
      {
        header: 'Wakala',
        accessorKey: 'wakala',
        meta: {
          sx: {  textAlign: 'right' }, // Applies border to the entire column
        },
      },
     
      // {
      //   header: 'Total Income',
      //   accessorKey: 'totalIncome',
      //   cell: (cell) => <Box sx={{ color: 'blue', fontWeight: 'bold' }}>{cell.getValue()}</Box>,

      // },
      {
        header: 'Total',
        accessorKey: 'totalIncome',
        size: 150, // Ensure column width for visibility
        meta: {
          sx: { borderRight: '1px solid #ededed', textAlign: 'right',backgroundColor: "rgba(138, 213, 225, 0.12)" }, // Applies border to the entire column
        },
        cell: (cell) => <Box sx={{  fontWeight: 'bold' }}>{cell.getValue()}</Box>,
      }
,      
      {
        header: 'Gawa',
        accessorKey: 'disburse',
        meta: {
          sx: {  textAlign: 'right' }, // Applies border to the entire column
        },
      },
      {
        header: 'Matumizi',
        accessorKey: 'expense',
        meta: {
          sx: {  textAlign: 'right' }, // Applies border to the entire column
        },
      },
      {
        header: 'Watumishi',
        accessorKey: 'watumishi',
        meta: {
          sx: {  textAlign: 'right' }, // Applies border to the entire column
        },
      },
      {
        header: 'Bank',
        accessorKey: 'bank',
        meta: {
          sx: {  textAlign: 'right' }, // Applies border to the entire column
        },
      },
     
      
      {
        header: 'Tolea',
        accessorKey: 'tolea',
        meta: {
          sx: {  textAlign: 'right' }, // Applies border to the entire column
        },
      },

      {
        header: 'Total',
        accessorKey: 'totalExpense',
        meta: {
          sx: { borderRight: '1px solid #ededed', textAlign: 'right',backgroundColor: "rgba(225, 138, 138, 0.12)" }, // Applies border to the entire column
        },
      },
      {
        header: 'Closing',
        accessorKey: 'closing',
        meta: {
          sx: {  textAlign: 'right' }, // Applies border to the entire column
        },
      },
      {
        header: 'Code',
        accessorKey: 'code',
        meta: {
          sx: {  textAlign: 'right' }, // Applies border to the entire column
        },
      },
    ],
    []
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {/* MainCard with Table */}
      <MainCard content={false} title="Closing Report">
        {/* Table */}
        <ReactTable columns={columns} data={data} />
      </MainCard>
    </div>
  );
};

export default ClosingScreen;