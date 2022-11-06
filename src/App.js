import { useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  const inputRef = useRef()
  const [firstNumber ,setFirstNumber] = useState(changeToBi(randomDecNumber()))
  const [secondNumber ,setSecondNumber] = useState(changeToBi(randomDecNumber()))
  const [seconds ,setSeconds] = useState(0)
  const inputAnswer = document.querySelector(".input-answer")
  function randomDecNumber() {
    const number = Math.floor( Math.random() * 255 )
    return number
  }
  function changeToBi(dec) {
    const binary = dec.toString(2)
    let temp = ""
    while (temp.length + binary.length < 8) {
      temp += "0"
    }
    const res = temp + binary
    
    return res
  }

  const createNumber= () => {
    setSeconds(0)
    setFirstNumber(changeToBi(randomDecNumber()))
    setSecondNumber(changeToBi(randomDecNumber()))
    if (inputRef.current.value) {
      inputRef.current.value = ''
    }
  }

  const checkAnswer = () => {
    const fNumber = parseInt(firstNumber,2)
    const sNumber = parseInt(secondNumber,2)
    const total = fNumber + sNumber
    const answer = total.toString(16)
    if (answer.toString() === inputRef.current.value) {
      inputAnswer.classList.add("correct")

      setTimeout(()=> {
        inputAnswer.classList.remove("correct")
      },1000)
    }
  }

  useEffect(()=> {
    const times = setInterval(()=> {
      setSeconds(prev => prev + 1)
    },1000)

    return() => {
      clearInterval(times)
    }
  }, [firstNumber,secondNumber])
  return (
    <div className="App">
      <div className="container">
        <div className="wrapper">
          <h1 className="title">Lab 8<sub>by X</sub></h1>
          <div className="timer">
            {seconds}
          </div>
          <div className="panel">
            <span id="first-number">{firstNumber}</span>
            +
            <span id="second-number">{secondNumber}</span>
          </div>
          <input className="input-answer" 
          type="text" 
          placeholder="Answer.." 
          ref={inputRef}
          />
          <div className="control">
            <button className="btn-check" onClick={checkAnswer}>Check</button>
            <button className="btn-next" onClick={createNumber}>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
