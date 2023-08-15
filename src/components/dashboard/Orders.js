import * as React from 'react';
import { useState,useEffect } from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { baseUrl } from '../../constant/base';
import axios from 'axios'

// Generate Order Data

function preventDefault(event) {
  event.preventDefault();
}

export default function Orders() {
  const accessToken = localStorage.getItem('accessToken');
  const [rows,setRow] = useState([])
  useEffect(() => {
    async function fetchData() {
    await axios.get(baseUrl+'/user',{
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
  } , []);
  return (
    <React.Fragment>
      <Title>Recent Orders</Title>
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link>
    </React.Fragment>
  );
}
