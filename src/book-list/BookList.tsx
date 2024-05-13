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

// create artificial data for the books
function createData(
  id: number,
  title: string,
  author: string,
  isbn: string,
  publisher: string,
  yearOfPublish: number,
  availableCopies: number,
) {
  return { id, title, author, isbn, publisher, yearOfPublish, availableCopies };
}

//data was prepared by ChatGPT
const rows = [
  createData(
    1,
    'Harry Potter',
    'J.K. Rowling',
    '9780545582889',
    'Publisher A',
    1997,
    10,
  ),
  createData(
    2,
    'To Kill a Mockingbird',
    'Harper Lee',
    '9780061120084',
    'Publisher B',
    1960,
    8,
  ),
  createData(
    3,
    '1984',
    'George Orwell',
    '9780451524935',
    'Publisher C',
    1949,
    5,
  ),
  createData(
    4,
    'The Great Gatsby',
    'F. Scott Fitzgerald',
    '9780743273565',
    'Publisher D',
    1925,
    7,
  ),
  createData(
    5,
    'Pride and Prejudice',
    'Jane Austen',
    '9780141439518',
    'Publisher E',
    1813,
    12,
  ),
  createData(
    6,
    'The Catcher in the Rye',
    'J.D. Salinger',
    '9780316769488',
    'Publisher F',
    1951,
    6,
  ),
  createData(
    7,
    'Lord of the Flies',
    'William Golding',
    '9780140283334',
    'Publisher G',
    1954,
    9,
  ),
  createData(
    8,
    'The Hobbit',
    'J.R.R. Tolkien',
    '9780345534835',
    'Publisher H',
    1937,
    11,
  ),
  createData(
    9,
    'Brave New World',
    'Aldous Huxley',
    '9780060850524',
    'Publisher I',
    1932,
    4,
  ),
  createData(
    10,
    'Moby-Dick',
    'Herman Melville',
    '9780142437247',
    'Publisher J',
    1851,
    3,
  ),
];

export default function BookList() {
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
      <Box sx={{ width: 700, marginBottom: '1rem' }}>
        <Typography variant="h5" gutterBottom>
          List of Books
        </Typography>
      </Box>
      <TextField
        fullWidth
        sx={{ width: 700 }}
        label="Find the book"
        variant="outlined"
      />
      <Box sx={{ width: '80%', marginTop: '1rem' }}>
        <TableContainer component={Paper}>
          <Table aria-label="custom pagination table">
            <TableHead>
              <TableRow>
                <TableCell align="center">ID</TableCell>
                <TableCell align="center">Title</TableCell>
                <TableCell align="center">Author</TableCell>
                <TableCell align="center">ISBN</TableCell>
                <TableCell align="center">Publisher</TableCell>
                <TableCell align="center">Year of Publish</TableCell>
                <TableCell align="center">Available Copies</TableCell>
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
                <TableRow key={row.id}>
                  <TableCell align="center">{row.id}</TableCell>
                  <TableCell align="center">{row.title}</TableCell>
                  <TableCell align="center">{row.author}</TableCell>
                  <TableCell align="center">{row.isbn}</TableCell>
                  <TableCell align="center">{row.publisher}</TableCell>
                  <TableCell align="center">{row.yearOfPublish}</TableCell>
                  <TableCell align="center">{row.availableCopies}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                  colSpan={7}
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
  );
}
