import { useState } from 'react'

function Card({ front, back, title, description }) {
  const [flipped, setFlipped] = useState(false)

  // Deck card mode (no front/back) — used on Dashboard
  if (!front && !back) {
    return (
      <div className="card">
        <h2 className="card-title">{title}</h2>
        <p className="card-description">{description}</p>
      </div>
    )
  }

  // Flashcard mode — flips on click
  return (
    <div className="card" onClick={() => setFlipped(!flipped)} style={{ cursor: 'pointer' }}>
      <p style={{ fontSize: '0.7rem', color: '#aaa', margin: '0 0 8px' }}>
        {flipped ? 'ANSWER' : 'QUESTION'}
      </p>
      <h2 className="card-title">{flipped ? back : front}</h2>
      <p style={{ fontSize: '0.7rem', color: '#ccc', marginTop: '12px' }}>click to flip</p>
    </div>
  )
}

export default Card