import React, { useState } from 'react'
import ReactDOM from 'react-dom';

const Button = (props) => (
    <button onClick={props.handleClick}>
        {props.text}
    </button>
)

const Statistic = ({ value }) => {

    //const { value } = props

    return (
        <p>{value}</p>
    )

}

const Statistics = (props) => {

    const { good, neutral, bad } = props
    const summa = good + neutral + bad
    const keskiarvo = (good - bad) / summa
    const positiivisia = good / summa * 100

    if (summa === 0) {
        return (
            <div>
                <h1>statistiikka</h1>
            </div>
        )
    }
    return (
        <div>
            <h1>statistiikka</h1>

            <table>
                <tr>
                    <td><Statistic value="hyvä" /></td>
                    <td><Statistic value={good} /></td>
                </tr>
                <tr>
                    <td><Statistic value="neutraali" /></td>
                    <td><Statistic value={neutral} /></td>
                </tr>
                <tr>
                    <td><Statistic value="huono" /></td>
                    <td><Statistic value={bad} /></td>
                </tr>
                <tr>
                    <td><Statistic value="yhteensä" /></td>
                    <td><Statistic value={summa} /></td>
                </tr>
                <tr>
                    <td><Statistic value="keskiarvo" /></td>
                    <td><Statistic value={keskiarvo} /></td>
                </tr>
                <tr>
                    <td><Statistic value="positiivisia" /></td>
                    <td><Statistic value={positiivisia + ' %'} /></td>
                </tr>
            </table>
        </div>
    )
}

const App = () => {
    // tallenna napit omaan tilaansa
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const setToGood = newValue => {
        setGood(newValue)
    }
    const setToNeutral = newValue => {
        setNeutral(newValue)
    }
    const setToBad = newValue => {
        setBad(newValue)
    }

    return (
        <div>
            <h1>anna palautetta</h1>
            <Button handleClick={() => setToGood(good + 1)} text="hyvä" />
            <Button handleClick={() => setToNeutral(neutral + 1)} text="neutraali" />
            <Button handleClick={() => setToBad(bad + 1)} text="huono" />
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>

    )
}


ReactDOM.render(<App />, document.getElementById('root'));

