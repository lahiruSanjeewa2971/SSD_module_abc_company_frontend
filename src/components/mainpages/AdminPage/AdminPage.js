import React, {useState} from 'react'
//import Alert from 'react-bootstrap/Alert'
import {Link} from 'react-router-dom'
import axios from 'axios'
import './adminpage.css'

const initialState = {
    fullName: '',
    userName: '',
    password: '',
    _id: ''
}

function AdminPage() {
    const [user, setUser] = useState({
        fullName: '',
        userName: '',
        password: ''
    })

    const onChangeInput = e => {
        const {name, value} = e.target;
        setUser({...user, [name]:value})
    }

    const registerUser = async e => {
        e.preventDefault()
        try {
            await axios.post('/user/register', {...user});
            //console.log("Hiiiiii");
            alert("New User added.");
            setUser(initialState);
            console.log(user);
        } catch (error) {
            alert(error.response.data.msg)
        }
    }

    return (
        <div className='adminPageMainContainer'>
            <div className='registerUserFormContainer'>
                <h2>New User Account</h2>
                <form onSubmit={registerUser}>
                    <input 
                        type="text"
                        name="fullName"
                        required
                        value={user.fullName}
                        onChange={onChangeInput}
                        className='inputField' 
                        placeholder='Full Name' 
                    />
                    <input 
                        type="text"
                        name="userName"
                        required
                        value={user.userName}
                        onChange={onChangeInput}
                        className='inputField' 
                        placeholder='User Name' 
                    />
                    <input 
                        type="password"
                        name="password"
                        required
                        value={user.password}
                        onChange={onChangeInput}
                        className='inputField' 
                        placeholder='Password' 
                    />
                    <button className='addNewUserButton' type='submit'>Add User</button>
                </form>
            </div>

        </div>
    )
}

export default AdminPage