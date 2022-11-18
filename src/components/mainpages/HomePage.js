import React, {useEffect, useState} from 'react'
import LoginPage from './auth/Login'
import './homepage.css'
import Background02 from '../../images/background_02.jpg'
import jwtDecode from 'jwt-decode'
import AdminPage from './AdminPage/AdminPage'

var backgroundStyle = {
    width: "100%",
    height: "985px",
    backgroundImage: `url(${Background02})`
}

function HomePage() {
    const [loginState, setLoginState]  = useState(false);
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState({})


    function handleCallBackResponse(response){
        //console.log("Encoded jwt token :"+response.credential);
        var userObject = jwtDecode(response.credential);
        setUser(userObject);
        document.getElementById("signInDiv").hidden = true;
        setLoginState(true)
    }

    function handleGoogleSignOut(event){
        setUser({});
        setLoginState(false);
        document.getElementById("signInDiv").hidden = false;
    }

    useEffect(() => {
        /*global google*/
        google.accounts.id.initialize({
            client_id: "909701814585-jgsarof9kk8fqg8ghdktsfkt7nujsind.apps.googleusercontent.com",
            callback: handleCallBackResponse
        });
        google.accounts.id.renderButton(
            document.getElementById("signInDiv"),
            {theme: "outline", size: "large"}
        );
    }, []);

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = (value) => {
        setOpen(false);
    }

    return (
        <div style={backgroundStyle}>
            
            {
                Object.keys(user).length != 0 &&
                <button onClick={ (e) => handleGoogleSignOut(e)} className='signOutButton'>Sign Out</button>
            }
            {/** Show admin details */}
            {
                user &&
                <div className='adminDisplayContainer'>
                    <img src={user.picture} alt='' className='adminProfileImageView'/>
                    <h4 className='adminEmailView'>{user.email}</h4>
                </div>
            }

            {
                loginState ?
                (
                    <div><AdminPage /></div>
                )
                : 
                (
                    <div className='loginButtonContainer'>
                        <h2 className='websiteTopic'>Welcome to ABC company</h2>
                        <button className='loginButton' onClick={handleOpen}>User Login</button>
                        <h6 style={{
                            fontSize: '20px'
                        }}>Admin login</h6>
                    </div>
                )
            }

            <div id='signInDiv' style={{
                marginLeft: '49.5rem',
                marginTop: '-45px'}}></div>

            <LoginPage 
                open={open}
                onClose={handleClose}
            />
        </div>
    )
}

export default HomePage