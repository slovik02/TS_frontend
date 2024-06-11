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
import Button from '@mui/material/Button';
import MenuAppBar from '../app-bar/AppBar';
import './LoanList.css';
import { useNavigate } from 'react-router-dom';
import { LibraryClient } from '../api/library-client';
import { useApi } from '../api/ApiProvider';
import { useEffect } from 'react';

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number,
  ) => void;
}

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

export default function LoanList() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setLoans] = React.useState<any[]>([]);

  const navigate = useNavigate();
  const apiClient: LibraryClient = useApi();

  useEffect(() => {
    apiClient.getLoans().then((response) => {
      console.log(response);
      setLoans(response.data);
    });
  }, [apiClient]);

  const handleAddLoanClick = () => {
    navigate('/addloan');
  };

  const handleUpdateLoanClick = () => {
    navigate('/updateloan');
  };

  const handleDeleteLoanClick = () => {
    // Implement the logic for deleting a loan here
    console.log('Delete loan clicked');
  };

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

  const formatDate = (date: string) => {
    const dateObj = new Date(date);
    return !isNaN(dateObj.getTime()) ? dateObj.toDateString() : 'Invalid Date';
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
                  ? rows?.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage,
                    )
                  : rows
                )?.map((row) => (
                  <TableRow key={row.loanId}>
                    <TableCell align="center">{row.loanId}</TableCell>
                    <TableCell align="center">
                      {formatDate(row.rentalDate)}
                    </TableCell>
                    <TableCell align="center">
                      {formatDate(row.endDate)}
                    </TableCell>
                    <TableCell align="center">
                      {row.returnDate ? formatDate(row.returnDate) : 'N/A'}
                    </TableCell>
                    <TableCell align="center">{row.user?.user_id}</TableCell>
                    <TableCell align="center">{row.book?.id}</TableCell>
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
                    count={rows != null ? rows.length : 0}
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
          <Box mt={2} sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              variant="contained"
              className="add-loan"
              onClick={handleAddLoanClick}
            >
              Add Loan
            </Button>
            <Button
              variant="contained"
              color="primary"
              className="add-loan"
              onClick={handleUpdateLoanClick}
            >
              Update Loan
            </Button>
            <Button
              variant="contained"
              color="secondary"
              className="add-loan"
              onClick={handleDeleteLoanClick}
            >
              Delete Loan
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}
