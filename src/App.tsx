import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

import './App.css'

function App() {
  return (
    <>
      {/* TODO:: Spinner Componentが実装されたら置き換える
       * @see https://github.com/shadcn-ui/ui/pull/3554
       */}
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </>
  )
}

export default App
