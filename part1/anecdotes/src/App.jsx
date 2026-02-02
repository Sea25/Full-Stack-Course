import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place.",
    "Programming without an extremely heavy use of console.log is same as driving blindfolded."
  ];

  // State for selected anecdote
  const [selected, setSelected] = useState(0);

  // State for votes (array filled with 0)
  const [votes, setVotes] = useState(
    new Array(anecdotes.length).fill(0)
  );

  // Function to show random anecdote
  const nextAnecdote = () => {
    const randomIndex = Math.floor(
      Math.random() * anecdotes.length
    );
    setSelected(randomIndex);
  };

  // Function to vote
  const voteAnecdote = () => {
    const copy = [...votes];   // make copy
    copy[selected] += 1;       // increase vote
    setVotes(copy);            // update state
  };

  // Find most voted anecdote
  const maxVotes = Math.max(...votes);
  const mostVotedIndex = votes.indexOf(maxVotes);

  return (
    <div style={{ padding: "20px" }}>

      <h2>Anecdote of the Day</h2>

      <p>{anecdotes[selected]}</p>

      <p>has {votes[selected]} votes</p>

      <button onClick={voteAnecdote}>
        Vote 👍
      </button>

      <button onClick={nextAnecdote}>
        Next Anecdote ➡️
      </button>

      <hr />

      <h2>Anecdote with Most Votes 🏆</h2>

      <p>{anecdotes[mostVotedIndex]}</p>

      <p>has {maxVotes} votes</p>

    </div>
  );
};

export default App;
