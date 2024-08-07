import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import { store } from './store.js'

import PrivateOutlet from './layout/PrivateOutlet.js'
import Root from './layout/Root.js'
import Error404 from './pages/Error404'
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'

import './styles/main.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/',
        element: <PrivateOutlet />,
        children: [
          {
            path: '/profile',
            element: <Profile />,
          },
        ],
      },
      {
        path: '*',
        element: <Error404 />,
      },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
)
