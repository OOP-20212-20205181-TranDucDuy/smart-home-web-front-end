import * as React from 'react';
import { useState,useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
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

// Generate Order Data

export default function Orders() {
  const accessToken = localStorage.getItem('accessToken');
  const [rows,setRow] = useState([]);
  const [page,setPage] = useState(1);
  useEffect(() => {
    async function fetchData() {
    await axios.get(baseUrl+`/user?page=${page}`,{
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }})
      .then(response => {
        setRow(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
    }
    fetchData();
    } , [page]);
  return (
    <React.Fragment>
      <Title>User</Title>
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
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.isActive.toString()}</TableCell>
              <TableCell>{row.roles}</TableCell>
              <TableCell align="right">{row.profile ? `${row.profile.name}` : ''}</TableCell>
              <TableCell>
                <IconButton onClick = {() => localStorage.setItem('user_id',row.id)}> <ForwardIcon /> </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
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
              <IconButton onClick={() => setPage(page + 1) } disabled={rows.length === 0}>
                <NavigateNextIcon />
              </IconButton> 
              
            </TableCell> 
          </TableRow>
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
