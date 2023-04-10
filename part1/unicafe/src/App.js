import { useState } from 'react'

const StatisticLine = ({ text, value }) => {
  return (
    <p>{text} {value}</p>
  )
}
const Button = ({ buttonText, onClick }) => {
  return (
    <button onClick={onClick}>{buttonText}</button>
  )
}

const Statistics = ({ good, neutral, bad, all}) => {
  if (all !== 0) {
    return (
      <div>
        <StatisticLine text={'good'} value={good}/>
        <StatisticLine text={'neutral'} value={neutral}/>
        <StatisticLine text={'bad'} value={bad}/>
        <StatisticLine text={'all'} value={all}/>
        <StatisticLine text={'average'} value={(good + bad * -1) / all}/>
        <StatisticLine text={'positive'} value={(good / all) * 100}/>
      </div>
    )
  } else {
    return (
      <div>No feedback given</div>
    )
  }
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
      <Button buttonText={'good'} onClick={() => handleGoodFeedback()} />
      <Button buttonText={'neutral'} onClick={() => handleNeutralFeedback()} />
      <Button buttonText={'bad'} onClick={() => handleBadFeedback()} />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} />
    </div>
  )
}

export default App