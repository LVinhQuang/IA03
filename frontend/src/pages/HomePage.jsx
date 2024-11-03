import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const HomePage = () => {
    const navigate = useNavigate();
    return (
        <>
            <div>HomePage</div>
            <div>
                <Link to='/login'>Login</Link>
            </div>
            <div>
                <Link to='/user/register'>Register</Link>
            </div>
        </>
    )
}

export default HomePage