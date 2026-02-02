import { useState } from 'react'

const App = () => {

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)

  const randomAnecdote = () => {
    const random = Math.floor(Math.random() * anecdotes.length)
    setSelected(random)
  }

  return (
    <div>

      <h1>Anecdote of the day</h1>

      <p>{anecdotes[selected]}</p>

      <button onClick={randomAnecdote}>
        Next anecdote
      </button>

    </div>
  )
}

export default App
