import { useState, useEffect } from 'react'
// @mui
import {
  Box,
  Button,
  Card,
  Table,
  Switch,
  TableBody,
  Container,
  TableContainer,
  TablePagination,
  FormControlLabel,
  LinearProgress,
  Alert
} from '@mui/material'
// Redux
import { useSelector, useDispatch } from 'react-redux'
import { getUsers } from 'src/redux/slices/user'
import useTable, { getComparator, emptyRows } from 'src/hooks/useTable'
// _mock_
// import { _userList } from 'src/_mock'
// components

import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs'
import Page from 'src/components/Page'
import Scrollbar from 'src/components/Scrollbar'
import { TableEmptyRows, TableHeadCustom, TableNoData } from 'src/components/table'
// sections
import { UserTableToolbar, UserTableRow } from 'src/sections/tables'
import StocksModal from 'src/sections/stocks/StocksModal'

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', align: 'left' },
  { id: 'company', label: 'Company', align: 'left' },
  { id: 'role', label: 'Role', align: 'left' },
  { id: 'isVerified', label: 'Verified', align: 'center' },
  { id: 'status', label: 'Status', align: 'left' },
  { id: '' }
]

// ----------------------------------------------------------------------

export default function Tables() {
  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,

    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage
  } = useTable()

  // console.log(_userList[0])

  useEffect(() => {
    dispatch(getUsers())
  }, [])

  const dispatch = useDispatch()
  const { isLoading, users, error } = useSelector((state) => state.user)

  const [tableData, setTableData] = useState(users ?? [])
  const [openStocks, setOpenStocks] = useState(false)

  const [query, setQuery] = useState('')

  const handleSearch = (query) => {
    setQuery(query)
    setPage(0)
  }

  const dataFiltered = applySortFilter({
    tableData,
    comparator: getComparator(order, orderBy),
    query
  })

  const denseHeight = dense ? 52 : 72

  const isNotFound = !dataFiltered.length && !!query

  return (
    <Page title="User: Table & Stocks">
      <Container maxWidth={true}>
        <HeaderBreadcrumbs
          heading="User Table"
          links={[{ name: 'App', href: '/' }, { name: 'Table' }]}
          action={
            <Button variant="contained" onClick={() => setOpenStocks(true)}>
              Load Stocks
            </Button>
          }
        />
        <StocksModal isOpenStocks={openStocks} onCloseStocks={() => setOpenStocks(false)} />
        {isLoading ? (
          <Box sx={{ width: '100%' }}>
            <LinearProgress />
          </Box>
        ) : error ? (
          <Alert severity="error">
            We encountered an error please try to{' '}
            <Button
              onClick={(e) => {
                dispatch(getUsers())
              }}
            >
              {' '}
              reload{' '}
            </Button>{' '}
          </Alert>
        ) : (
          <Card>
            <UserTableToolbar query={query} onSearch={handleSearch} />
            <Scrollbar>
              <TableContainer sx={{ minWidth: 800, position: 'relative' }}>
                <Table size={dense ? 'small' : 'medium'}>
                  <TableHeadCustom order={order} orderBy={orderBy} headLabel={TABLE_HEAD} rowCount={tableData.length} onSort={onSort} />

                  <TableBody>
                    {dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                      <UserTableRow key={row.id} row={row} onEditRow={() => console.log(row.name)} />
                    ))}

                    <TableEmptyRows height={denseHeight} emptyRows={emptyRows(page, rowsPerPage, tableData.length)} />

                    <TableNoData isNotFound={isNotFound} />
                  </TableBody>
                </Table>
              </TableContainer>
            </Scrollbar>

            <Box sx={{ position: 'relative' }}>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={dataFiltered.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={onChangePage}
                onRowsPerPageChange={onChangeRowsPerPage}
              />

              <FormControlLabel
                control={<Switch checked={dense} onChange={onChangeDense} />}
                label="Dense"
                sx={{ px: 3, py: 1.5, top: 0, position: { md: 'absolute' } }}
              />
            </Box>
          </Card>
        )}
      </Container>
    </Page>
  )
}

// ----------------------------------------------------------------------

function applySortFilter({ tableData, comparator, query }) {
  const stabilizedThis = tableData.map((el, index) => [el, index])

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) return order
    return a[1] - b[1]
  })

  tableData = stabilizedThis.map((el) => el[0])

  if (query) {
    tableData = tableData.filter((item) => {
      const setString = item.name + item.company + item.role + item.status
      return setString.toLowerCase().indexOf(query.toLowerCase()) !== -1
    })
  }

  return tableData
}
