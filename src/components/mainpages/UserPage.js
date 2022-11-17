import React, {useContext, useState} from 'react'
import {GlobalState} from '../../GlobalState'
import axios from 'axios'
import './userpage.css'
import Background02 from '../../images/background_02.jpg'

var backgroundStyle = {
    width: "100%",
    height: "985px",
    backgroundImage: `url(${Background02})`
}

const initialState = {
  message: ''
}

function UserPage() {
  const state = useContext(GlobalState)
  const [isLogged, setIsLogged] = state.userAPI.isLogged
  const [isManager, setIsManager] = state.userAPI.isManager
  const [formContent, setFormContent] = useState(initialState)

  const handleChangeInput = e =>{
    const {name, value} = e.target
    setFormContent({...formContent, [name]:value})
  }

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      console.log(formContent);
      setFormContent(initialState);
    } catch (err) {
      alert(err.response.data.msg);
    }
  }

  const logoutUser = async () => {
    await axios.get('/user/logout')
    localStorage.clear()
    setIsLogged(false)
    setIsManager(false)
    window.location.href = "/";
  }

  const loggedRouter = () => {
    return(
      <>
        <div className='logoutButtonContainer'>
          <button className='logoutButton' onClick={logoutUser}>Logout</button>
        </div>
      </>
    )
  }

  return (
    <div className='userPageContainer' style={backgroundStyle}>

      <h3 className='userNameTopic'>{isManager ? 'Manager Page' : 'User Page'}</h3>

      <div className='userPageContentContainer'>
        {isLogged && loggedRouter()}

        <div className='getUserInputsContainer'>
          <form onSubmit={handleSubmit}>
            <textarea
              placeholder='Enter a message'
              rows={5}
              cols={15}
              name="message"
              onChange={handleChangeInput}
              value={formContent.message}
            />
            {
              isManager ?
              (
                <div>
                  <button className='buttonUpload'>Upload a file</button>
                </div>
              )
              :
              (
                <></>
              )
            }
            <button type='submit' className='buttonSend'>Send</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UserPage