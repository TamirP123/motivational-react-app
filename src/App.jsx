import { useState } from 'react'
import { Container } from 'react-bootstrap';
import './App.css'

function App() {


  return (
    <div className="hero">
      <div className="overlay"></div>
      <Container className="hero-content">
        <h2>You don’t get to go through life only <br />doing the things that you feel like doing.</h2>
        <p>Your journey to a better life starts here</p>
      </Container>
    </div>
  )
}

export default App
