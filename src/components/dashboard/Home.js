
import * as React from 'react';
import { useState,useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import { Button, CircularProgress } from '@mui/material';
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
import { Link, useNavigate } from 'react-router-dom';
import filterRowsBySearch from '../utils/Search'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// Generate Order Data
const accessToken = localStorage.getItem('accessToken');
export default function Home() {
  
  const [rows,setRow] = useState([]);
  const [page,setPage] = useState(1);
  const [searchInput,setSearchInput] = useState("");
  const [filteredRows, setFilteredRows] = useState([]);
  const navigate = useNavigate();
  const handleActiveHome = async (id) => {
    try {
      const response = await axios.post(
        `${baseUrl}/home/active-smarthome/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response);
      // You might want to update the data after activating a home
      fetchData();
    } catch (error) {
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
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(baseUrl + `/home?page=${page}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setRow(response.data.data);
      const filteredData = filterRowsBySearch(response.data.data, searchInput);
      setFilteredRows(filteredData);
    } catch (error) {
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
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, searchInput]);
  return (
    <React.Fragment>
      <Title>Homes</Title>
      <TextField
        label="Search"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder="Search..."
        style={{ marginBottom: '20px' }}
      />
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>IsActive</TableCell>
            <TableCell>Wifi</TableCell>
            <TableCell>Owner</TableCell>
            <TableCell align="right">Active</TableCell>
          </TableRow>
        </TableHead>
        {filteredRows.length !== 0 ? (
          <TableBody>
          {filteredRows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.address}</TableCell>
              <TableCell>{row.isActive.toString()}</TableCell>
              <TableCell>{row.wifi}</TableCell>
              <TableCell>{row.owner.profile.id}</TableCell>
              {row.isActive === false ? (
                  <TableCell align="right">
                  <IconButton
                      onClick={() => handleActiveHome(row.id)}
                    >
                  <CheckCircleIcon />
                </IconButton>
                </TableCell>
              ) : (null)}
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