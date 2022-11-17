import React, {useState} from 'react'
import {Dialog, DialogTitle} from '@mui/material'
import axios from 'axios'
import './login.css'

const initialState = {
    userName: '',
    password: ''
}

function Login(props) {
    const {onClose, open} = props;
    const [user, setUser] = useState(initialState);

    const handleClose = () => {
        onClose(true);
    }

    const onChangeInput = e => {
        const {name, value} = e.target;
        setUser({...user, [name]:value})
    }

    const loginSubmit = async e => {
        e.preventDefault()
        try {
            await axios.post('/user/login', {...user});

            localStorage.setItem('firstLogin', true);

            window.location.href = "/userPage";
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    return (
        <div>
            <Dialog
                className='dialogView'
                onClose={handleClose}
                open={open}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle className='dialogTitle'>
                    <h3>Login</h3>
                </DialogTitle>

                <div className='loginFormStyle'>
                    <form onSubmit={loginSubmit}>
                        <input 
                            type="text"
                            name='userName'
                            required
                            value={user.userName}
                            onChange={onChangeInput}
                            className='inputText' 
                            placeholder='Username'
                        /><br/>

                        <input 
                            type="password"
                            name='password'
                            required
                            value={user.password}
                            onChange={onChangeInput}
                            className='inputText' 
                            placeholder='Password'
                        />
                        
                        <button type='submit' className='loginFormButton'>Login</button>
                    </form>
                    
                </div>
            </Dialog>
        </div>
    )
}

export default Login