import React, { useState, useEffect } from 'react'
import axios from 'axios'


const Filter = ( { newFilter, handleFilterChange } ) => {
  return (
    <form> find countries
        <input
          value={newFilter}
          onChange={handleFilterChange}
       />
    </form>
  )
}

const Weather = ({ capital, weather }) => {
 
  return (
    <div>
      <h3>Weather in {capital}</h3>
      <p><b>Temperature:</b> {weather.temp}  Celcius</p>
      <img src={weather.iconUrl} alt="sunny pic" />
      <p>
        <b>wind:</b> {weather.wind} kph
        direction {weather.windDir}
      </p>
    </div>
  )
}

const Countries = ({countries, newFilter, setNewFilter,capital, setCapital, weather, setWeather}) => {

  const showCountry = (name) => {
    setNewFilter(name)
  }

  const filtered = countries.filter(country => country.name.toLowerCase().match(newFilter.toLowerCase()))

  if (filtered.length === 1) {
    let country = filtered[0]
    let languages = country.languages.map(language => language.name)

    const showLanguages = () => {
      return languages.map(language =>
        <li key={language}>
          {language}
        </li>
      )
    }
    let thisCapital = country.capital
    console.log('THIS CAPITAL: ',thisCapital)
    console.log('CAPITAL: ',capital)
    setCapital(thisCapital)

      console.log('capital: ', country.capital)
      let query = 'https://api.apixu.com/v1/current.json?key=748bf165d4f247fa843162921190204&q=' + capital
      console.log('effect weather')
      console.log(query)
      axios
        .get(query)
        .then(response => {
          console.log('weather - promise fulfilled')
          let temp = response.data.current.temp_c
          let wind = response.data.current.wind_kph
          let windDir = response.data.current.wind_dir
          let iconUrl = response.data.current.condition.icon
          console.log('sää: ', temp, wind, windDir)
          let newWeather = { temp, wind, windDir, iconUrl }
          setWeather(newWeather)
          console.log(newWeather)
        })
 
    return (
      <div>
        <h1>{country.name}</h1>
        <p>capital {country.capital}</p>
        <p>population {country.population}</p>
        <h3>languages</h3>
        <ul>
          {showLanguages()}
        </ul>
        <img src={country.flag} width="120" alt={country.name} />
        <Weather capital={capital} weather={weather} />
      </div>
    )

  } else if (filtered.length > 10) {
    return (
      <p>Too many matches, specify another filter</p>
    )
  } else {
    return filtered.map(country =>
      <div key={country.name}>
        {country.name}
        <button onClick={() => showCountry(country.name)}>show</button>
      </div>
    )
  }
}

const App = () => {

  const [newFilter, setNewFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [weather, setWeather] = useState({})
  const [capital, setCapital] = useState('Paris')

  useEffect(() => {
    console.log('effect countries')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('country - promise fulfilled')
        setCountries(response.data)
      })
  }, [])
  console.log('render', countries.length, 'countries')

  /* useEffect(() => {
    console.log('capital: ',capital)
    let query = 'https://api.apixu.com/v1/current.json?key=748bf165d4f247fa843162921190204&q=' + capital
    console.log('effect weather')
    console.log(query)
    axios
      .get(query)
      .then(response => {
        console.log('weather - promise fulfilled')
        let temp = response.data.current.temp_c
        let wind = response.data.current.wind_kph
        let windDir = response.data.current.wind_dir
        let iconUrl = response.data.current.condition.icon
        console.log('sää: ', temp, wind, windDir)
        let newWeather = { temp, wind, windDir, iconUrl }
        setWeather(newWeather)
        console.log(newWeather)
      })
  }, []) */


  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }
 
  return (
    <div>
      <Filter
        newFilter={newFilter}
        handleFilterChange={handleFilterChange}
      />
      <Countries
        countries={countries}
        newFilter={newFilter}
        setNewFilter={setNewFilter}
        capital={capital}
        setCapital={setCapital}
        weather={weather}
        setWeather={setWeather}
      />
    </div>
  )
}

export default App;
