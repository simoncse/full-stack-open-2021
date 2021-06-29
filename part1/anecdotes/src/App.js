import React, { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blod tests when dianosing patients'
  ]
   
  const [votes, setVotes] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [top, setTop] = useState(0);
  const [selected, setSelected] = useState(0)
  const [topIndex, setTopIndex] = useState(0);
  
  const handleVote = () => {
    const newVote = [...votes];
    newVote[selected] += 1;
    setVotes(newVote);

    let top = Math.max(...newVote)
    let topIndex = [...newVote].indexOf(top)
    setTop(top);
    setTopIndex(topIndex);
    
  }

  const handleClick = () => {
    setSelected(Math.floor(Math.random()*7));
  }
  
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <p>
        <button onClick={handleVote}>Vote</button>
        <button onClick={handleClick}>Next anecdote</button>
      </p>

      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[topIndex]}</p>
      <p>has {top} votes</p>
    </div>
    
  )
}

export default App;