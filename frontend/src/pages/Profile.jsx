import React, {useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from './api';
import { Typography, Button } from '@mui/material';
import { useStore } from '../store';

const Profile = () => {
    const user = useStore((state) => state.user);
    const setUser = useStore((state) => state.setUser);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        setUser(null);
        navigate('/login');
    }

    useEffect(() => {
        api.get('/profile', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => {
            setUser(res.data);
            setLoading(false);
        })
        .catch(err => {
            setLoading(false);
            navigate('/login');
        });
    }, []);
    return (
        <>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <>
                    <Typography variant='h1'>Profile</Typography>
                    {user && <Typography variant='h5'>Welcome {user.email}</Typography>}
                    <Button variant='contained' color='error' sx={{mt: '15px'}} onClick={handleLogout}>Logout</Button>
                </>
            )}
        </>
    )
}

export default Profile