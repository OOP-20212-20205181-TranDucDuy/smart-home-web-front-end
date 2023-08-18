import * as React from 'react';
import { useState,useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { CircularProgress } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import TextField from '@mui/material/TextField';
import { baseUrl } from '../../constant/base';
import axios from 'axios'
import ForwardIcon from '@mui/icons-material/Forward';
import { Link, useNavigate } from 'react-router-dom';
import  filterRowsBySearch from '../utils/Search';

// Generate Order Data

export default function Users() {
  const accessToken = localStorage.getItem('accessToken');
  const [rows, setRow] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchData() {
    await axios.get(baseUrl+`/user?page=${page}`,{
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }})
      .then(response => {
        setRow(response.data);
        const filteredData = filterRowsBySearch(response.data, searchInput);
        setFilteredRows(filteredData);
      })
      .catch(error => {
        if (error.response) {
          if (error.response.status === 401) {
            localStorage.removeItem('accessToken');
            navigate('/');
            alert('Unauthorized error:', error.response.data);
          } else if (error.response.status === 500) {
            alert('Internal Server Error:', error.response.data);
          }
        } else {
          console.log('Error:', error.message);
        }
      });
    }
    fetchData();
    } , [page,searchInput]);
  return (
    <React.Fragment>
      <Title>User</Title>
      <TextField
        label="Search"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        style={{ marginBottom: '20px' }}
      />
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>IsActive</TableCell>
            <TableCell>Role</TableCell>
            <TableCell align="right">Name</TableCell>
          </TableRow>
        </TableHead>
        {filteredRows.length !== 0 ? (
          <TableBody>
          {filteredRows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.isActive.toString()}</TableCell>
              <TableCell>{row.roles}</TableCell>
              <TableCell align="right">{row.profile.name ? (row.profile.name): ("")}</TableCell>
              <TableCell align="right">
                <IconButton
                    component={Link}
                    to={`/dashboard/users/profile/${row.id}`}
                  >
                <ForwardIcon />
              </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        ) :(
          <TableBody>
            <TableRow>
              <TableCell colSpan={6} align="center">
                <CircularProgress />
              </TableCell>
            </TableRow>
          </TableBody>
        )}
      </Table>
      <Table size='small'>
      <TableBody>
        <TableRow>
            <TableCell colSpan={5} align="center">
              <IconButton onClick={() => setPage(page - 1)} disabled={page === 1}>
                <NavigateBeforeIcon />
              </IconButton> 
            </TableCell> 
            <TableCell colSpan={5} align="center">
              <TextField
                type="number"
                value={page}
                onChange={(e) => setPage(parseInt(e.target.value))}
                style={{ width: 60, marginRight: 10 }}
              />
             </TableCell>
            <TableCell colSpan={5} align="center">
              <IconButton onClick={() => setPage(page + 1) } disabled={filteredRows.length === 0}>
                <NavigateNextIcon />
              </IconButton> 
              
            </TableCell> 
          </TableRow>
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
