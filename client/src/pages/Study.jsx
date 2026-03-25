import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../api/axios'
import Card from '../components/Card'

function Study() {
  const { deckId } = useParams()
  const [cards, setCards]     = useState([])
  const [index, setIndex]     = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get(`/decks/${deckId}/cards`)
      .then(res => setCards(res.data))
      .finally(() => setLoading(false))
  }, [deckId])

  if (loading) return <p>Loading...</p>
  if (cards.length === 0) return <p>No cards in this deck.</p>

  return (
    <div style={{ textAlign: 'center' }}>
      <p>{index + 1} / {cards.length}</p>
      <Card front={cards[index].front} back={cards[index].back} />
      <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
        <button onClick={() => setIndex(i => Math.max(0, i - 1))}>← Prev</button>
        <button onClick={() => setIndex(i => Math.min(cards.length - 1, i + 1))}>Next →</button>
      </div>
    </div>
  )
}

export default Study