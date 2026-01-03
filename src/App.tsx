import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './layout/Layout'
import Home from './pages/Home'

const App = () => {
  const router = createBrowserRouter([
    {
      path : "",
      element : <Layout />,
      children : [
        {
          path : "",
          element : <Home />
        }
      ]
    }
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App