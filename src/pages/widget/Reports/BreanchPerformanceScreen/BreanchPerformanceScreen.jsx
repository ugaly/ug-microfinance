"use client"

import { useState, useEffect, useMemo } from "react"
import axios from "axios"
import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableCell,
  TableHead,
  TableRow,
  Box,
  Collapse,
  IconButton,
  Typography,
  CircularProgress,
} from "@mui/material"
import MainCard from "components/MainCard"
import ScrollX from "components/ScrollX"
import { CSVExport } from "components/third-party/react-table"
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"
import { baseUrl } from "Service/baseUrl"

// ==============================|| REACT TABLE ||============================== //

function ReactTable({ columns, data }) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  const headers = table.getAllColumns().map((column) => ({
    label: typeof column.columnDef.header === "string" ? column.columnDef.header : "#",
    key: column.columnDef.accessorKey,
  }))

  return (
    <MainCard
      content={false}
      title="Branch Performance"
      secondary={<CSVExport {...{ data, headers, filename: "branch-performance.csv" }} />}
    >
      <ScrollX>
        <TableContainer component={Paper} sx={{ maxHeight: 544 }}>
          <Table stickyHeader>
            <TableHead>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableCell
                      key={header.id}
                      {...header.column.columnDef.meta}
                      sx={{
                        fontWeight: 600,
                        textTransform: "uppercase",
                        backgroundColor: "background.paper",
                        padding: "16px",
                      }}
                    >
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>
            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <RowWithExpandableContent key={row.id} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </ScrollX>
    </MainCard>
  )
}

// ==============================|| EXPANDABLE ROW COMPONENT ||============================== //

const RowWithExpandableContent = ({ row }) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <TableRow sx={{ "& > td": { borderBottom: open ? "none" : undefined } }}>
        {/* <TableCell padding="checkbox">
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell> */}
        {row.getVisibleCells().map((cell) => (
          <TableCell onClick={() => setOpen(!open)} key={cell.id} {...cell.column.columnDef.meta}>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </TableCell>
        ))}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={row.getVisibleCells().length + 1}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Arrears Details
              </Typography>
              <Table size="small" aria-label="arrears-details">
                <TableHead>
                  <TableRow>
                    <TableCell>Category</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell align="center">Total Loans</TableCell>
                    <TableCell align="right">Total Outstanding</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.original.arrears.map((arrear, index) => (
                    <TableRow key={index}>
                      <TableCell>{arrear.category}</TableCell>
                      <TableCell>{arrear.name}</TableCell>
                      <TableCell align="center">{arrear.totalLoans}</TableCell>
                      <TableCell align="right">{arrear.totalOutstanding}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}

// ==============================|| BRANCH PERFORMANCE SCREEN ||============================== //

const BranchPerformanceScreen = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}loan-report/branch`, {
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
        header: "",
        accessorKey: "expand",
        cell: () => null, // This will be replaced by the expand button
      },
      {
        header: "BRANCH NAME",
        accessorKey: "name",
      },
      {
        header: "REGION",
        accessorKey: "region",
      },
      {
        header: "DISTRICT",
        accessorKey: "district",
      },
      {
        header: "TOTAL ACTIVE LOANS",
        accessorKey: "totalActive",
      },
      {
        header: "TOTAL INACTIVE LOANS",
        accessorKey: "totalInActive",
      },
      {
        header: "ARREARS",
        accessorKey: "arrears",
        cell: ({ row }) => row.original.arrears.length,
      },
    ],
    [],
  )

  if (loading) return <CircularProgress />
  if (error) return <Typography color="error">Error: {error.message}</Typography>

  return (
    <MainCard content={false} title="Branch Performance">
      <ReactTable columns={columns} data={data} />
    </MainCard>
  )
}

export default BranchPerformanceScreen

