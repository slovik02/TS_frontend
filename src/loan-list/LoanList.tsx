import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import TableHead from '@mui/material/TableHead';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuAppBar from '../app-bar/AppBar';

// changes of pages
interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number,
  ) => void;
}

// change the page
function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

function createData(
  ID: number,
  RentalDate: Date,
  EndDate: Date,
  ReturnDate: Date | null,
  UserID: number,
  BookID: number,
) {
  return { ID, RentalDate, EndDate, ReturnDate, UserID, BookID };
}

//data was prepared by ChatGPT
const rows = [
  createData(
    1,
    new Date('2024-05-01'),
    new Date('2024-06-01'),
    new Date('2024-05-25'),
    1001,
    2001,
  ),
  createData(
    2,
    new Date('2024-05-10'),
    new Date('2024-06-10'),
    new Date('2024-06-05'),
    1002,
    2002,
  ),
  createData(
    3,
    new Date('2024-05-15'),
    new Date('2024-06-15'),
    null,
    1003,
    2003,
  ),
  createData(
    4,
    new Date('2024-04-20'),
    new Date('2024-05-20'),
    new Date('2024-05-15'),
    1004,
    2004,
  ),
  createData(
    5,
    new Date('2024-04-25'),
    new Date('2024-05-25'),
    new Date('2024-05-20'),
    1005,
    2005,
  ),
  createData(
    6,
    new Date('2024-05-05'),
    new Date('2024-06-05'),
    new Date('2024-06-01'),
    1006,
    2006,
  ),
  createData(
    7,
    new Date('2024-05-08'),
    new Date('2024-06-08'),
    new Date('2024-06-04'),
    1007,
    2007,
  ),
  createData(
    8,
    new Date('2024-05-12'),
    new Date('2024-06-12'),
    null,
    1008,
    2008,
  ),
  createData(
    9,
    new Date('2024-05-14'),
    new Date('2024-06-14'),
    null,
    1009,
    2009,
  ),
];

export default function LoanList() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <MenuAppBar />
      <Box
        sx={{
          width: '100%',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            width: 700,
            marginBottom: '1rem',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography variant="h5" gutterBottom>
            List of Loans
          </Typography>
        </Box>
        <TextField
          fullWidth
          sx={{ width: 700 }}
          label="Find the loan"
          variant="outlined"
        />
        <Box sx={{ width: '80%', marginTop: '1rem' }}>
          <TableContainer component={Paper}>
            <Table aria-label="custom pagination table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">ID</TableCell>
                  <TableCell align="center">Rental Date</TableCell>
                  <TableCell align="center">End Date</TableCell>
                  <TableCell align="center">Return Date</TableCell>
                  <TableCell align="center">User ID</TableCell>
                  <TableCell align="center">Book ID</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? rows.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage,
                    )
                  : rows
                ).map((row) => (
                  <TableRow key={row.ID}>
                    <TableCell align="center">{row.ID}</TableCell>
                    <TableCell align="center">
                      {row.RentalDate.toDateString()}
                    </TableCell>
                    <TableCell align="center">
                      {row.EndDate.toDateString()}
                    </TableCell>
                    <TableCell align="center">
                      {row.ReturnDate ? row.ReturnDate.toDateString() : 'N/A'}
                    </TableCell>
                    <TableCell align="center">{row.UserID}</TableCell>
                    <TableCell align="center">{row.BookID}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[
                      5,
                      10,
                      25,
                      { label: 'All', value: -1 },
                    ]}
                    colSpan={6}
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </>
  );
}
