import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Die from './Die'

function App() {
  const [dice, setDice] =useState(allNewDice())


  function allNewDice(){
    const newDice=[]
    for (let i=0; i<10; i++){
      newDice.push({
        value:Math.ceil(Math.random() * 6),
        isHeld:false
      })
    }
    return newDice
  }

  function rollDice(){
    setDice(allNewDice())
  }

  const diceElements = dice.map(die => <Die value={die.value} isHeld={die.isHeld}/>)

  return (
    <main>
        <div className='dice-container'>
          {diceElements}
        </div>
        <button className='roll-dice' onClick={rollDice}>Roll</button>
    </main>
  )
}

export default App
