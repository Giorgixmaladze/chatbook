import { BrowserRouter, Routes, Route } from "react-router-dom"
import Signup from './pages/Signup'
import AuthProvider, { AuthContext } from './context/AuthContext'
import PostProvider from './context/PostContext'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Posts from './pages/Posts'
import Users from './pages/Users'
import UserProvider from './context/UsersContext'
import { useContext } from 'react'

// Inner component that uses AuthContext (must be inside AuthProvider)
function AppRoutes() {
  const { loading } = useContext(AuthContext)

  // Show loading state while checking authentication
  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <Routes>
      <Route path='/' element={<Signup />} />
      <Route path='/login' element={<Login />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/posts' element={<Posts />} />
      <Route path='/users' element={<Users />} />
    </Routes>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PostProvider>
          <UserProvider>
            <AppRoutes />
          </UserProvider>
        </PostProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
