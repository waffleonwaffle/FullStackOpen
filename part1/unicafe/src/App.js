import { useState } from 'react'

const StatisticLine = ({ text, value }) => {
  return (
    <td>{text} {value}</td>
  )
}
const Button = ({ buttonText, onClick }) => {
  return (
    <button onClick={onClick}>{buttonText}</button>
  )
}

const Statistics = ({ good, neutral, bad, all }) => {
  if (all !== 0) {
    return (
      <table>
        <tbody>
          <tr>
            <StatisticLine text={'good'} value={good} />
          </tr>
          <tr>
            <StatisticLine text={'neutral'} value={neutral} />
          </tr>
          <tr>
            <StatisticLine text={'bad'} value={bad} />
          </tr>
          <tr>
            <StatisticLine text={'all'} value={all} />
          </tr>
          <tr>
            <StatisticLine text={'average'} value={((good + bad * -1) / all).toFixed(2)} />
          </tr>
          <tr>
            <StatisticLine text={'positive'} value={`${((good / all) * 100).toFixed(2)}%`} />
          </tr>
        </tbody>
      </table>
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