import { useState } from 'react'
import './index.css'
import Routers from "../components/Router"

function App() {
  const [count, setCount] = useState(0)  

  return (
    <>
      <Routers />
    </>
  )
}

export default App
