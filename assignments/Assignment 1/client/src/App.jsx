import { useState } from 'react'
import './App.css'
import Home from './home'
import DynamicIsland from './DynamicIsland'
import Footer from './footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <DynamicIsland />
      <Home />
      <Footer />
    </>
  )
}

export default App
