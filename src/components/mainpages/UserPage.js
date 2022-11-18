import React, {useContext, useState} from 'react'
import {GlobalState} from '../../GlobalState'
import axios from 'axios'
import './userpage.css'
import Loading from './loading/Loading'
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
  const [isUser, setIsUser] = state.userAPI.isUser
  const [image, setImage] = useState(false)
  const [loading, setLoading] = useState(false)

  const [formContent, setFormContent] = useState(initialState)

  const [token] = state.token;

  const handleChangeInput = e =>{
    const {name, value} = e.target
    setFormContent({...formContent, [name]:value})
  }
  const handleUpload = async e => {
    e.preventDefault();
    try {
      if(!isManager) return alert("You're not a manager")
      const file = e.target.files[0]
      console.log(file)

      if(!file) return alert("File not exist.")

      if(file.size > 1024 * 1024* 10) // 10mb
        return alert("Size too large!")

      if(file.type !== 'image/jpeg' && file.type !== 'image/png')
        return alert('File type incorrect')

      let formData = new FormData();
      
      formData.append('file', file, file.name)
      
      setLoading(true)
      const res = await axios.post('/api/upload', formData, {
        headers: {"Content-Type": "multipart/form-data"}
      })
      setLoading(false)

      setImage(res.data)

    } catch (err) {
      alert(err.response.data.msg)
    }
  }

  const handleUserSubmit = async e => {
    e.preventDefault();
    try {
      console.log(formContent);
      await axios.post('/formdata/userFormData', {...formContent}, {
        headers: {Authorization: token}
      });
      alert("New Message added.")
      setFormContent(initialState);
    } catch (err) {
      alert(err.response.data.msg);
    }
  }

  const handleManagerSubmit = async e => {
    e.preventDefault();
    try {
      if(!image) return alert("No image uploaded.");

      await axios.post('/formdata/managerFormData', {...formContent, image}, {
        headers: {Authorization: token}
      })
      alert("New message and an image uploaded.")
      setImage(false)
      setFormContent(initialState)

    } catch (err) {
      alert(err.response.data.msg);
    }
    console.log(formContent);
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
                  <input type="file" name="file" id='file_up' onChange={handleUpload} />

                  {
                    loading && <Loading/>
                  }

                  <button type='submit' className='buttonSend' onClick={handleManagerSubmit}>Send</button>
                </div>
              )
              :
              (
                <button type='submit' className='buttonSend' onClick={handleUserSubmit}>Send</button>
              )
            }
            
          
        </div>
      </div>
    </div>
  )
}

export default UserPage