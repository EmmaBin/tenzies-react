import { useState } from 'react'
import { useEffect} from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Die from './Die'
import {nanoid} from 'nanoid'
import Confetti from 'react-confetti'

function App() {
  const [dice, setDice] =useState(allNewDice())
  const [tenzie, setTenzie] = useState(false)

  // everytime when the dice state changes, useEffect is applied
  useEffect(()=>{
    // determine the wining condition:
    // 1. all isHeld is true
    // 2. all values are the same
    const heldTrue = dice.every(die => die.isHeld)
    const sampleValue= dice[0].value
    const allValues = dice.every(die => die.value === sampleValue)
    if (heldTrue && allValues){
      setTenzie(true)
    }
  }, [dice])


  function allNewDice(){
    const newDice=[]
    for (let i=0; i<10; i++){
      newDice.push(generateDice())
    }
    return newDice
  }

  function generateDice(){
    return{
        value:Math.ceil(Math.random() * 6),
        isHeld:false,
        id: nanoid()
      }
    
  }
  function rollDice(){
    setDice(oldDice => oldDice.map(die=>{
      return die.isHeld ?
              die:
              generateDice()
    }))
  }

  function holdDice(id){
    setDice(oldDice => oldDice.map(die=>{
      return die.id === id ?
        {...die, isHeld : !die.isHeld}:
        die
    }))
  }
  const diceElements = dice.map(die => (
  <Die key={die.id} 
        value={die.value} 
        isHeld={die.isHeld} 
        holdDice={() => holdDice(die.id)}
        />))

  return (
    <main>
        {tenzie && <Confetti />}
        <h1 className="title">Tenzies</h1>
        <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className='dice-container'>
          {diceElements}
        </div>
       {tenzie ? <button className='roll-dice' onClick={rollDice}>New Game</button> : <button className='roll-dice' onClick={rollDice}>Roll</button>} 
       
    </main>
  )
}

export default App
