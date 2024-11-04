import React, { useState } from 'react'
import Container from '@mui/material/Container'
import { Box } from '@mui/material'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import * as yup from 'yup'
import {useNavigate, Link} from 'react-router-dom'
import { api } from './api'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    const validationSchema = yup.object().shape({
        email: yup.string().email('Email không hợp lệ').required('Vui lòng nhập email'),
        password: yup.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự').required('Vui lòng nhập mật khẩu'),
    });
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await validationSchema.validate({ email, password });
            const response = await api.post('/login', { email, password });
            localStorage.setItem('token', response.data.accessToken);
            window.alert('Đăng nhập thành công!')
            navigate('/')
        } catch (error) {
            // Xử lý lỗi
            console.log(error)
            if (error.response) {
                setError(error.response.data.message)
            }
            else {
                setError(error.message)
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card variant='outlined' sx={{ width: '500px', marginTop: '30px', padding: '30px' }} >
            <Typography variant='h3' fontWeight="bold">Log In</Typography>
            <Box >
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Email"
                        variant="outlined"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}

                        fullWidth
                        margin="normal"
                    />
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <Button 
                        type="submit" 
                        variant="contained" 
                        color="primary" 
                        fullWidth 
                        sx={{ mt: '15px' }}
                        disabled={loading}
                    >
                        {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                    </Button>
                </form>
                <Typography variant='subtitle1' sx={{margin: '5px'}}>Chưa có tài khoản?
                    <Link to='/register'>Đăng ký</Link>
                </Typography>
            </Box>
        </Card>
    )
}

export default Login