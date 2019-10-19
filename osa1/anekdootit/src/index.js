import React, { useState } from 'react'
import ReactDOM from 'react-dom'

 
const Button = (props) => ( 

    <button onClick={props.handleClick}>
        {props.text}
    </button>
)

const App = (props) => {

    const [selected, setSelected] = useState(0) 
    const pointsit = [] 
    for(let i = 0; i < props.anecdotes.length; i++){ 
        pointsit.push(0)
    } 
    const [pisteet, setPisteet] = useState(pointsit) 
    const [maxIndex, setMaxIndex] = useState(0)

    
    const setRandom = () => {
        let random = Math.floor(Math.random() * 6)
        setSelected(random)
    } 
    // const vote = () => {
    //     let lista = pisteet
    //     console.log(pisteet)
    //     lista[selected] +=1;
    //     setPisteet(lista)
    // }

    const vote = () => { 
       
        const copy = [...pisteet] 
        copy[selected] += 1
        let max = Math.max.apply(Math, copy) 
        let indexi = copy.indexOf(max) 
        setPisteet(copy)
        setMaxIndex(indexi)

        /* console.log("") 
        console.log('copy: ', copy)
        console.log('pist: ', pisteet)  */
    }

    return ( 
        <div>
            <h2>Anecdote of the day</h2>
            {props.anecdotes[selected]}
            <p>has {pisteet[selected]} votes</p>
            <p><Button handleClick={() => vote()} text="vote" /> 
            <Button handleClick={() => setRandom()} text="next anecdote" /></p>
            <h2>Anecdote with most votes</h2>
            {props.anecdotes[maxIndex]}
            <p>has {pisteet[maxIndex]} votes</p>
        </div>
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)