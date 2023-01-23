import { useState } from 'react'
import './App.css'
import Doctors from './Doctors'

function App() {
  return (
    <div className="App">
      <h1 style={{marginBottom: "30px"}}>Doctors</h1>
      <Doctors />
    </div>
  )
}

export default App
