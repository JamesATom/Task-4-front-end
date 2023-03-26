import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/joy/Box';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import { DataGrid } from '@mui/x-data-grid';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import DeleteIcon from '@mui/icons-material/Delete';

const column = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'name', headerName: 'Username', width: 120 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'createdAt', headerName: 'Date of registration', width: 220 },
    { field: 'updatedAt', headerName: 'Date of last login',width: 220 },
    { field: 'status', headerName: 'Status', width: 120 },
];

export default function HomeTable() {
    const navigate = useNavigate();
    const [row, setRow] = useState([]);
    const [selected, setSelected] = useState();
    const [requistedOrNot, setRequistedOrNot] = useState(true);

    useEffect(() => {
            axios.get('https://task-4-back-end-production-9cf4.up.railway.app/users')
                .then((res) => {
                    setRow(res.data);
                }, networkError => console.log(`Network Error ${networkError}`));
            console.log('hell world');
    }, [requistedOrNot]);

    const handleRowClick = (ids) => {
        const select = new Set(ids);
        const json = JSON.stringify(Array.from(select));
        setSelected(json);
    }
    const handleUnblock = () => {
        const res = axios.put('https://task-4-back-end-production-9cf4.up.railway.app/users/unblock', {"block": selected})
            .then((res) => {
                if (res.data == 'success')
                    return res.data;
            }, networkError => console.log(`Network Error ${networkError}`))
        setRequistedOrNot(prev => prev == true ? false : true);   
    }
    const handleBlock = () => {
        const res = axios.put('https://task-4-back-end-production-9cf4.up.railway.app/users/block', {"block": selected})
            .then((res) => {
                if (res.data == 'success')
                    return res.data;
            }, networkError => console.log(`Network Error ${networkError}`));
        setRequistedOrNot(prev => prev == true ? false : true);   
        let tempSelected = JSON.parse(selected);
        let arr = [];
        for (let each of row) {
            if (tempSelected.includes(each.id)) {
                arr.push(each.email);
            }
        }
        let tempEmail = window.sessionStorage.getItem("email");
        arr.forEach(each => {
            if (each == tempEmail) {
                window.sessionStorage.clear();
                window.sessionStorage.setItem("blocked", tempEmail);
                return navigate('/');
            }
        });
    }
    const handleDelete = () => {
        console.log(selected);
        const res = axios.put('https://task-4-back-end-production-9cf4.up.railway.app/users/delete', {"block": selected})
            .then((res) => {
                if (res.data == 'success')
                    return res.data;
            }, networkError => console.log(`Network Error ${networkError}`)
            .catch(err => {
                console.log(`Personal Error: ${err}`);
            }));
        setRequistedOrNot(prev => prev == true ? false : true); 
        let tempSelected = JSON.parse(selected);
        let arr = [];
        for (let each of row) {
            if (tempSelected.includes(each.id)) {
                arr.push(each.email);
            }
        }
        let tempEmail = window.sessionStorage.getItem("email");
        arr.forEach(each => {
            if (each == tempEmail) {
                window.sessionStorage.clear();
                return navigate('/');
            }
        });
    }
  return (
        <>
            <AppBar>
                <Toolbar sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    background: '#33ab9f'
                    }}>
                    <IconButton disableRipple>Home</IconButton>
                    <IconButton onClick={() => {
                        window.sessionStorage.clear();
                        navigate('/')}}><LogoutIcon /></IconButton>
                </Toolbar>
            </AppBar>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexWrap: 'wrap',
            }}>
                <Box width='100%' marginTop='300px'>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '20px'
                    }}>
                        <Box>
                            <IconButton onClick={handleUnblock} color='primary'>Unblock<LockOpenIcon sx={{padding: '0px 10px'}}/></IconButton>
                        </Box>
                        <Box>
                            <IconButton onClick={handleBlock} color='warning'>Lock<LockPersonIcon sx={{padding: '0px 10px'}}/></IconButton>
                        </Box>
                        <Box>
                            <IconButton onClick={handleDelete} color='error'>Delete<DeleteIcon sx={{padding: '0px 10px'}}/></IconButton>
                        </Box>
                    </Box>
                </Box>
                <div style={{ 
                    height: '500px', 
                    width: '1100px',
                    }}>
                    <DataGrid
                    rows={row}
                    columns={column}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    onRowSelectionModelChange={handleRowClick}
                    checkboxSelection
                    disableColumnMenu={true}
                    />
                </div>
            </Box> 
        </>
  );
}


