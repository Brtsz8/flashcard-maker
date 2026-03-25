import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import Header from './components/Header'
import Footer from './components/Footer'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Generate from './pages/Generate'
import Study from './pages/Study'

function ProtectedRoute({ children }) {
  const { token } = useAuth()
  return token ? children : <Navigate to="/login" />
}

function App() {
  return (
    <>
      <Header />
      <main style={{ padding: '1rem' }}>
        <Routes>
          <Route path="/login"    element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={
            <ProtectedRoute><Dashboard /></ProtectedRoute>
          } />
          <Route path="/generate" element={
            <ProtectedRoute><Generate /></ProtectedRoute>
          } />
          <Route path="/study/:deckId" element={
            <ProtectedRoute><Study /></ProtectedRoute>
          } />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App
