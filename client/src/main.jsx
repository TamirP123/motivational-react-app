import React from 'react'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import App from './App.jsx';
import Homepage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import DisciplinePage from './pages/DisciplinePage.jsx';
import FaithPage from './pages/FaithPage.jsx';
import GrowthPage from './pages/GrowthPage.jsx';
import ConfidencePage from './pages/ConfidencePage.jsx';
import SuccessStories from './pages/SuccessStories.jsx';
import Post from './pages/Post.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <h1 className='display-2'>Wrong page!</h1>,
    children: [
      {
        index: true,
        element: <Homepage />
      }, {
        path: '/login',
        element: <LoginPage />
      },
      {
        path: '/signup',
        element: <SignupPage />
      },
      {
        path: '/discipline',
        element: <DisciplinePage />
      },
      {
        path: '/faith',
        element: <FaithPage />
      },
      {
        path: '/growth',
        element: <GrowthPage />
      },
      {
        path: '/confidence',
        element: <ConfidencePage />
      },
      {
        path: '/success-stories',
        element: <SuccessStories />
      }, {
        path: '/post/:postId',
        element: <Post />
      },
      {
        path: '/profile',
        element: <ProfilePage />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)

