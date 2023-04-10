import { useState } from 'react'
const Statistics = ({good, neutral, bad, all}) => {
  return (
    <div>
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {all}</p>
      <p>average {(good + bad*-1)/((all === 0)? 1 : all)}</p>
      <p>positive {(good/((all === 0)? 1 : all)) * 100}%</p>
    </div>
  )
}
const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const handleGoodFeedback = () => {
    setGood(good + 1)
    setAll(all + 1)
  }
  const handleNeutralFeedback = () => {
    setNeutral(neutral + 1)
    setAll(all + 1)

  }
  const handleBadFeedback = () => {
    setBad(bad + 1)
    setAll(all + 1)
  }
  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => handleGoodFeedback()}>good</button>
      <button onClick={() => handleNeutralFeedback()}>neutral</button>
      <button onClick={() => handleBadFeedback()}>bad</button>
      <Statistics good={good} neutral={neutral} bad={bad} all = {all}/>
    </div>
  )
}

export default App