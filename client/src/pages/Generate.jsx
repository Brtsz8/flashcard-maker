import { useState } from 'react'
import api from '../api/axios'
import Card from '../components/Card'

function Generate() {
  const [paragraph, setParagraph] = useState('')
  const [cards, setCards]         = useState([])
  const [loading, setLoading]     = useState(false)
  const [error, setError]         = useState(null)
  const [saved, setSaved]         = useState(false)

  const handleGenerate = async () => {
    if (!paragraph.trim()) return
    setLoading(true)
    setError(null)
    setSaved(false)
    try {
      const res = await api.post('/generate', { paragraph })
      setCards(res.data.cards)
    } catch {
      setError('Generation failed. Check your server is running.')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    try {
      await api.post('/decks', {
        title: paragraph.slice(0, 40) + '...',
        cards
      })
      setSaved(true)
    } catch {
      setError('Failed to save deck.')
    }
  }

  return (
    <div>
      <h2>Generate Flashcards</h2>
      <textarea rows={6} style={{ width: '100%' }}
        placeholder="Paste a paragraph here..."
        value={paragraph}
        onChange={e => setParagraph(e.target.value)}
      />
      <button onClick={handleGenerate} disabled={loading}>
        {loading ? 'Generating...' : 'Generate'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {saved  && <p style={{ color: 'green' }}>Deck saved!</p>}

      {cards.length > 0 && (
        <>
          <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '1rem' }}>
            {cards.map((card, i) => (
              <Card key={i} front={card.front} back={card.back} />
            ))}
          </div>
          <button onClick={handleSave} style={{ marginTop: '1rem' }}>
            Save to My Decks
          </button>
        </>
      )}
    </div>
  )
}

export default Generate