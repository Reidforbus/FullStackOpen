import { useState } from 'react'

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [sum, setSum] = useState(0)
  const [avg, setAvg] = useState(0)
  const [pos, setPos] = useState(0)
  

  const HandleClickGood = () => {
    let newgood = good +1
    let newsum = sum + 1
    setGood(newgood)
    setSum(newsum)
    setAvg((newgood - bad)/newsum)
    setPos(100*(newgood/newsum))
  }

  const HandleClickNeutral = () => {
    let newneutral = neutral +1
    let newsum = sum + 1
    setNeutral(newneutral)
    setSum(newsum)
    setAvg((good - bad)/newsum)
    setPos(100*(good/newsum))
  }

  const HandleClickBad = () => {
    let newbad = bad + 1
    let newsum = sum + 1    
    setBad(newbad)
    setSum(newsum)
    setAvg((good - newbad)/newsum)
    setPos(100*(good/newsum))
  }


  return (
    <div>
      <Header line={'give feedback'}/>
      <Button text={'good'} funct={HandleClickGood}/>
      <Button text={'neutral'} funct={HandleClickNeutral}/>
      <Button text={'bad'} funct={HandleClickBad}/>
      <Header line={'statistics'}/>
      <Statistics good={good} neutral={neutral} bad={bad} sum={sum} avg={avg} pos={pos}/>
    </div>
  )
}

const Statistics = ({good,neutral,bad,sum,avg,pos}) => {
  if (sum === 0){
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )}

  else{
    return (

      <table>
        <tbody>
          <StatisticLine text={'good'} value={good}/>
          <StatisticLine text={'neutral'} value={neutral}/>
          <StatisticLine text={'bad'} value={bad}/>
          <StatisticLine text={'all'} value={sum}/>
          <StatisticLine text={'average'} value={avg} />
          <StatisticLine text={'positive'} value={pos + ' %'} />
          </tbody>
      </table>
)}}

const StatisticLine = ({text, value}) => {
  return(
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
)}


const Header = ({line}) => {
  return (
    <h1>{line}</h1>
)}

const Button = ({text,funct}) => {
  return <button onClick={funct}>{text}</button>
}

export default App