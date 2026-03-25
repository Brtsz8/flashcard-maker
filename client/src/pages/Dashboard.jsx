import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/axios'
import Card from '../components/Card'

function Dashboard() {
  const [decks, setDecks]   = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/decks')
      .then(res => setDecks(res.data))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p>Loading...</p>

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Your Decks</h2>
        <Link to="/generate"><button>+ Generate New</button></Link>
      </div>
      {decks.length === 0 && <p>No decks yet. Generate your first one!</p>}
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {decks.map(deck => (
          <Link to={`/study/${deck.id}`} key={deck.id} style={{ textDecoration: 'none' }}>
            <Card title={deck.title} description={deck.description} />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Dashboard