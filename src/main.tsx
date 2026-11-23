import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import HomePage from './pages/HomePage'
import NewShowPage from './pages/NewShowPage'
import ShowPage from './pages/ShowPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/show/new',
    element: <NewShowPage />
  },
  {
    path: '/show/:id',
    element: <ShowPage />
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
