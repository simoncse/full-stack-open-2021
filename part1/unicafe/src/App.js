import React, { useState } from 'react';
import Button from './Button';
import Statistics from './Statistics';

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
      setGood(good + 1);
  }
   
  const handleNeutralCick = () => {
    setNeutral(neutral + 1);
  }
 
  const handleBadClick = () => {
  setBad(bad + 1);
  }


  return (
    <div>
      <h1>Give Feedback</h1>
      <div className="options">
        <Button action = {handleGoodClick} text="Good"/>
        <Button action = {handleNeutralCick} text="Neutral"/>
        <Button action = {handleBadClick}text="Bad"/>
      </div>
      <h2>statistics</h2>
      <div>
        <Statistics good = {good} neutral = {neutral} bad = {bad} />
      </div>
    </div>
  )
}

export default App
