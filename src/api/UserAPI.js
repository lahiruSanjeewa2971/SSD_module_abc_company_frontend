import React, {useState, useEffect} from 'react'
import axios from 'axios'

function UserAPI(token) {
    const [isLogged, setIsLogged] = useState(false)
    const [isManager, setIsManager] = useState(false)

    useEffect(() => {
        if(token){
            const getUser = async () => {
                try {
                    const res = await axios.get('/user/infor', {
                        headers: {Authorization: token}
                    })
                    setIsLogged(true)
                    res.data.role === 1 ? setIsManager(true) : setIsManager(false)
                    
                } catch (err) {
                    alert(err.response.data.msg)
                }
            }
            getUser()
        }
    },[token])

    return {
        isLogged: [isLogged, setIsLogged],
        isManager: [isManager, setIsManager]
    }
}

export default UserAPI