import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import Home from './pages/home.jsx';
import Accueil from './pages/accueil.jsx';

const router = createBrowserRouter([
  {
    path:'/home',
    element:<Home/>
  },
  {
    path:'/accueil',
    element:<Accueil/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}>
    </RouterProvider>
  </React.StrictMode>,
)
