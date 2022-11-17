import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import HomePage from './HomePage'
import UserPage from './UserPage'

function Pages() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage/>}></Route>
        <Route path='/userPage' element={<UserPage/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Pages