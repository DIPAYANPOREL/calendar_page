import { useState } from 'react'
import './App.css';
import Cal from './pages/Cal';


import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Cal />
    </div>
  )
}

export default App
