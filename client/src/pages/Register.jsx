import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../api/axios'

function Register() {
  const [name, setName]         = useState('')
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState(null)
  const { login } = useAuth()
  const navigate  = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    try {
      const res = await api.post('/auth/register', { name, email, password })
      login(res.data.token, res.data.user)
      navigate('/')
    } catch {
      setError('Registration failed. Email may already be in use.')
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto' }}>
      <h2>Register</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div><input placeholder="Name" value={name}
          onChange={e => setName(e.target.value)} /></div>
        <div><input placeholder="Email" value={email}
          onChange={e => setEmail(e.target.value)} /></div>
        <div><input type="password" placeholder="Password" value={password}
          onChange={e => setPassword(e.target.value)} /></div>
        <button type="submit">Register</button>
      </form>
      <p>Have an account? <Link to="/login">Login</Link></p>
    </div>
  )
}

export default Register