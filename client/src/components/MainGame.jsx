import React, { useState, useEffect } from 'react'
import axios from 'axios';

const ALLCARDS = [
    'c2 ', 'c3 ', 'c4 ', 'c5 ', 'c6 ', 'c7 ', 'c8 ', 'c9 ', 'c10 ', 'c11 ', 'c12 ', 'c13 ', 'c14 ',
    'd2 ', 'd3 ', 'd4 ', 'd5 ', 'd6 ', 'd7 ', 'd8 ', 'd9 ', 'd10 ', 'd11 ', 'd12 ', 'd13 ', 'd14 ',
    'h2 ', 'h3 ', 'h4 ', 'h5 ', 'h6 ', 'h7 ', 'h8 ', 'h9 ', 'h10 ', 'h11 ', 'h12 ', 'h13 ', 'h14 ',
    's2 ', 's3 ', 's4 ', 's5 ', 's6 ', 's7 ', 's8 ', 's9 ', 's10 ', 's11 ', 's12 ', 's13 ', 's14 '
]

const CARDVALUE = {
    'c2 ': 2, 'c3 ': 3, 'c4 ': 4, 'c5 ': 5, 'c6 ': 6, 'c7 ': 7, 'c8 ': 8, 'c9 ': 9, 'c10 ': 10, 'c11 ': 11, 'c12 ': 12, 'c13 ': 13, 'c14 ': 14,
    'd2 ': 2, 'd3 ': 3, 'd4 ': 4, 'd5 ': 5, 'd6 ': 6, 'd7 ': 7, 'd8 ': 8, 'd9 ': 9, 'd10 ': 10, 'd11 ': 11, 'd12 ': 12, 'd13 ': 13, 'd14 ': 14,
    'h2 ': 2, 'h3 ': 3, 'h4 ': 4, 'h5 ': 5, 'h6 ': 6, 'h7 ': 7, 'h8 ': 8, 'h9 ': 9, 'h10 ': 10, 'h11 ': 11, 'h12 ': 12, 'h13 ': 13, 'h14 ': 14,
    's2 ': 2, 's3 ': 3, 's4 ': 4, 's5 ': 5, 's6 ': 6, 's7 ': 7, 's8 ': 8, 's9 ': 9, 's10 ': 10, 's11 ': 11, 's12 ': 12, 's13 ': 13, 's14 ': 14
}

const MainGame = () => {
    const [amountOfPlayerCards, setAmountOfPlayerCards] = useState(26)
    const [amountOfComputerCards, setAmountOfComputerCards] = useState(26)
    const [text, setText] = useState("")
    const [gameActive, setGameActive] = useState(true)
    const [playerTotalWins, setPlayerTotalWins] = useState(0)
    const [computerTotalWins, setComputerTotalWins] = useState(0)
    const [allWins, setAllWins] = useState([])
    const [values, setValues] = useState({
        playerDeck: [],
        computerDeck: [],
        playerCard: [],
        computerCard: []
    })

    // Starts game from new
    const startGame = () => {
        let shuffledCards = ALLCARDS.sort(() => Math.random() - 0.5)
        values.playerDeck = (shuffledCards.slice(0, 26))
        values.computerDeck = (shuffledCards.slice(26, 52))
        console.log(values.playerDeck)
        console.log(values.computerDeck)
        setText("")
    }

    // Starts game on application launch by shuffling deck and spliting the cards between 2 players
    useEffect(() => {
        startGame()
        // eslint-disable-next-line
    }, []);

    // Starts new game from onClick newGame
    const newGame = () => {
        startGame()
        setAmountOfPlayerCards(26)
        setAmountOfComputerCards(26)
        setGameActive(true)
    }

    // Runs game - onClick dealCard
    const dealCard = () => {
        console.log(gameActive)
        var p1c = values.playerDeck.shift()
        var c1c = values.computerDeck.shift()

        // Compares each card value
        if (CARDVALUE[p1c] > CARDVALUE[c1c]) {
            setText("Win!")
            values.playerDeck.push(p1c, c1c)
        }
        else if (CARDVALUE[c1c] > CARDVALUE[p1c]) {
            setText("Lose!")
            values.computerDeck.push(c1c, p1c)
        }
        else if (CARDVALUE[c1c] === CARDVALUE[p1c]) {
            startWar(p1c, c1c)
        }
        else {
            if (amountOfPlayerCards === 0) {
                setText("LOSE this Round!")
                setComputerTotalWins(computerTotalWins + 1)
                setGameActive(false)
                console.log(gameActive)
            }
            else if (amountOfComputerCards === 0) {
                setText("WIN this Round!")
                setPlayerTotalWins(playerTotalWins + 1)
                setGameActive(false)
                console.log(gameActive)
            }
        }
        currentDeckCount()
        console.log(p1c)
        console.log(c1c)

        // Updates state
        var tempValues = { ...values }
        tempValues.playerCard = p1c
        tempValues.computerCard = c1c
        setValues(tempValues);
    }

    // Starts War
    const startWar = (p1c, c1c) => {

        var playingWar = true
        var currentCard = [p1c, c1c]

        while (playingWar) {

            // Checks if either player has less than 2 cards
            if (amountOfPlayerCards < 2) {
                setText("LOSE this Round, not enough cards!")
                setComputerTotalWins(computerTotalWins + 1)
                setGameActive(false)
                console.log(gameActive)
            }
            if (amountOfComputerCards < 2) {
                setText("WIN this Round, computer does not have enough cards!")
                setPlayerTotalWins(playerTotalWins + 1)
                setGameActive(false)
                console.log(gameActive)
            }
            else {
                // Plays out war if either player has enough cards
                for (let i = 0; i < 25; i++) {
                    currentCard.push(
                        values.playerDeck.shift(),
                        values.computerDeck.shift()
                    )
                }
                var newP1c = values.playerDeck.shift();
                var newC1c = values.computerDeck.shift();

                if (CARDVALUE[newP1c] > CARDVALUE[newC1c]) {
                    setText("Win War!")
                    values.playerDeck.push(...currentCard, newP1c, newC1c)
                }
                else if (CARDVALUE[newC1c] > CARDVALUE[newP1c]) {
                    setText("Lose War!")
                    values.computerDeck.push(...currentCard, newC1c, newP1c)
                }
            }
            // Updates state
            var tempValues = { ...values }
            tempValues.playerCard = newP1c
            tempValues.computerCard = newC1c
            setValues(tempValues);
            playingWar = false
        }
    }

    // Updates the deck number of cards
    const currentDeckCount = () => {
        setAmountOfPlayerCards(values.playerDeck.length)
        setAmountOfComputerCards(values.computerDeck.length)
    }

    // Saves score onClick
    const saveScore = () => {
        newGame()
        axios.post('http://localhost:8000/api/war/winround', {
            playerTotalWins,
            computerTotalWins
        })
            .then(res => {
                setAllWins(res.data[res.data.length - 1]);
                console.log(res)
            })
            .catch(err => console.log(err))
    }

    // Displays wins
    useEffect(() => {
        axios.get('http://localhost:8000/api/win/all')
            .then(res => {
                setAllWins(res.data[res.data.length - 1]);
                console.log(res.data)
            })
            .catch(err => console.error(err));
    }, [allWins]);


    return (
        <div>
            <h1>War</h1>
            <button onClick={newGame}>New Game</button><br></br><br></br>

            {
                !gameActive ? (
                    <div>
                        <div>
                            Game Over!!!
                            <button onClick={saveScore}>Save Score</button>
                        </div>
                    </div>
                ) : (
                    <div>
                        <button onClick={dealCard}>Deal Card</button>
                    </div>
                )
            }

            {/* If you want to see cards it maps through them */}
            <h3>Player Cards: {values.playerDeck.map((card, idx) => {
                return (
                    <span key={idx}>{card}</span>
                )
            })}</h3>
            <h3>Player Number of Cards: {amountOfPlayerCards} | Player Card: {values.playerCard}</h3>
            {/* If you want to see cards it maps through them */}
            <h3>Player Cards: {values.computerDeck.map((card, idx) => {
                return (
                    <span key={idx}>{card}</span>
                )
            })}</h3>
            <h3>Computer Number of Cards: {amountOfComputerCards} | Computer Card: {values.computerCard}</h3>
            <h3>You {text}</h3>
            <hr></hr>
            <h2>ScoreBoard</h2>
            <h3>Player lifetime wins: {allWins && allWins.playerTotalWins}</h3>
            <h3>Computer lifetime wins: {allWins && allWins.computerTotalWins}</h3>
        </div>
    )
}

export default MainGame;

