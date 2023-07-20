'use client'

import React, { useState, useEffect } from 'react'
import Confetti from 'react-confetti';

const RockPaperScissors: React.FC = () => {
  const [userChoice, setUserChoice] = useState<string>('')
  console.log(userChoice, 'userChoice')
  const [computerChoice, setComputerChoice] = useState<string>('')
  console.log(computerChoice, 'computerChoice')
  const [result, setResult] = useState<React.ReactNode>('')
  const [win, setWin] = useState<string>('')
  const [playerScore, setPlayerScore] = useState<number>(
    parseInt(localStorage.getItem('playerScore')) || 0
  )
  const [computerScore, setComputerScore] = useState<number>(
    parseInt(localStorage.getItem('computerScore')) || 0
  )

  const clearScores = () => {
    setPlayerScore(0)
    setComputerScore(0)
    setResult('')
    localStorage.removeItem('playerScore')
    localStorage.removeItem('computerScore')
  }

  const getChoiceIcon = (choice: string, player: string) => {
    switch (choice) {
      case 'rock':
        return <img src={`img/${player}rock.png`} alt="rock" />
      case 'paper':
        return <img src={`img/${player}paper.png`} alt="paper" />
      case 'scissors':
        return <img src={`img/${player}scissors.png`} alt="scissors" />
      default:
        return null
    }
  }

  const possibleChoices = ['rock', 'paper', 'scissors']

  const generateComputerChoice = () => {
    const randomNumber = Math.floor(Math.random() * 3)
    console.log('randomNumber', randomNumber)
    setComputerChoice(possibleChoices[randomNumber])
  }

  useEffect(() => {
    getResult()
  }, [computerChoice, userChoice])

  const [showConfetti, setShowConfetti] = useState<boolean>(false);

  useEffect(() => {
    if (win === 'win') {
      setShowConfetti(true);
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 5000); // Hide the confetti after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [win]);

  const getResult = () => {
    console.log('getResult', computerChoice, userChoice)
    if (computerChoice === userChoice) {
      setResult(<h1 className="text-black text-3xl">It's a draw!</h1>)
      setWin('draw')
    } else if (
      (computerChoice === 'rock' && userChoice === 'paper') ||
      (computerChoice === 'paper' && userChoice === 'scissors') ||
      (computerChoice === 'scissors' && userChoice === 'rock')
    ) {
      setResult(<h1 className="text-green-500 text-3xl">You win!</h1>)
      setWin('win')
      incrementPlayerScore()
    } else {
      setResult(<h1 className="text-red-500 text-3xl">You lose!</h1>)
      setWin('lose')
      incrementComputerScore()
    }
  }

  const incrementPlayerScore = () => {
    setPlayerScore((prevScore) => prevScore + 1)
    localStorage.setItem('playerScore', (playerScore + 1).toString())
  }

  const incrementComputerScore = () => {
    setComputerScore((prevScore) => prevScore + 1)
    localStorage.setItem('computerScore', (computerScore + 1).toString())
  }

  return (
    <>
      <div className="p-5 text-center flex flex-wrap justify-center md:justify-end space-x-4 md:space-x-10 full-w items-center">
        <div id="player-score">
          <strong>You: </strong>
          {playerScore}
        </div>
        <div id="computer-score">
          <strong>Computer: </strong> {computerScore}
        </div>
            <button
              onClick={clearScores}
              className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded sm:mt-4 md:mt-0"
            >
              Clear Scores
            </button>
      </div>
      <div className="flex min-h-screen flex-col items-center md:justify-around py-24">
        <div className="text-center flex space-x-10">
          <div id="computer-choice">
            {getChoiceIcon(computerChoice, 'player1-')}
          </div>
          <div id="user-choice">{getChoiceIcon(userChoice, 'player2-')}</div>
        </div>
        <div className="mt-10 md:mt-0">
        <div className="p-5 text-center flex flex-wrap justify-center text-center md:justify-end full-w items-center">
          <div id="result">{win === "lose" ? result : ""}</div>
          <div id="result">{win === "draw" ? result : ""}</div>
          <div id="result">{win === "win" ? result : ""}</div>
          </div>
          {showConfetti && <Confetti />}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10 lg:mt-4">
          <button
            key="paper"
            onClick={() => {
              setUserChoice('paper')
              generateComputerChoice()
            }}
            className="bg-supernova-500 hover:bg-supernova-600 text-white py-2 px-4 rounded"
          >
            Paper
          </button>
          <button
            key="scissors"
            onClick={() => {
              setUserChoice('scissors')
              generateComputerChoice()
            }}
            className="bg-secondary-600 hover:bg-secondary-600 text-white py-2 px-4 rounded"
          >
            Scissors
          </button>
          <button
            key="rock"
            onClick={() => {
              setUserChoice('rock')
              generateComputerChoice()
            }}
            className="bg-primary-800 hover:bg-primary-600 text-white py-2 px-4 rounded"
          >
            Rock
          </button>
        </div>
      </div>
    </>
  )
}

export default RockPaperScissors
