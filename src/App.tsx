import { useState } from 'react'
import { Outlet } from 'react-router-dom'

import './App.css'
import reactLogo from './assets/react.svg'

import viteLogo from '/vite.svg'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Outlet />
      <div>
        <a href="https://vitejs.dev" rel="noreferrer" target="_blank">
          <img className="logo" alt="Vite logo" src={viteLogo} />
        </a>
        <a href="https://react.dev" rel="noreferrer" target="_blank">
          <img className="logo react" alt="React logo" src={reactLogo} />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
