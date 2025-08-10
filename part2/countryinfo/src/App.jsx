import { useState, useEffect } from 'react'
import countryService from './services/restcountries'
import weatherService from './services/openweatherapi'


const App = () => {
    const [searchResults, setSearchResults] = useState([])
    const [countryNames, setCountryNames] = useState(null)
    const [chosenCountry, setChosenCountry] = useState(null)
    const [weatherData, setWeatherData] = useState(null)

    const handleSearchChange = (event) => {
        const newstr = event.target.value
        if (newstr === ''){
            console.log('Search string empty')
            setSearchResults([])
            return
        }
        const matchingNames = countryNames.filter(name => name.toLowerCase().includes(newstr.toLowerCase()))
        console.log(matchingNames)
        setSearchResults(matchingNames)
    }

    const chooseCountry = (event) => {
        const countryName = event.target.value
        console.log('Choosing: ' + countryName)
        setSearchResults([countryName])
    }

    useEffect(() => {
        console.log('Getting list of countries')

        countryService.getAll().then(response => {
            const names = response.data.map(countryObj => countryObj.name.common)
            console.log(names)
            setCountryNames(names)
        })
    }, [])

    useEffect(() => {
        if (searchResults.length !== 1) {
            setChosenCountry(null)
            return
        }

        if (chosenCountry && chosenCountry.name.common === searchResults[0]) return
        console.log("Single match remains")
        countryService.getCountry(searchResults[0])
            .then(response => {
                console.log('Got country: ' + response.data.name.common)
                setChosenCountry(response.data)
            })

    }, [searchResults, chosenCountry])

    useEffect(() => {
        if (!chosenCountry) {
            setWeatherData(null)
            return
        }
        const [lat, long] = chosenCountry.capitalInfo.latlng
        weatherService.getWeather(lat,long).then((response => {
            console.log(response.data)
            setWeatherData(response.data)
        }))
    }, [chosenCountry])

    return (
        <div>
        <SearchBox changeHandler={handleSearchChange}/>
        <Results countries={searchResults} chooser={chooseCountry}/>
        <CountryCard country={chosenCountry} weatherData={weatherData}/>
        </div>
    )
}

const SearchBox = ({changeHandler}) => {
    return (
        <form onSubmit={e => e.preventDefault()}>
        <div>find countries <input onChange={changeHandler}/></div>
        </form>
    )
}

const Results = ({countries, chooser}) => {
    if (countries.length < 2) {
        return
    }
    if (countries.length > 10){
        return ("Too many matches, specify another filter")
    }

    return (
        <ul>
        {countries.map(country => <li key={country}>{country} <button onClick={chooser} value={country}>Show</button></li>)}
        </ul>
    )
}

const CountryCard = ({country, weatherData}) => {
    if (!country) return null
    return (
        <div>
        <h1>{country.name.common}</h1>
        <p>Capital {country.capital[0]}</p>
        <p>Area {country.area}km<sup>2</sup></p>
        <h2>Languages</h2>
        <ul>
        {Object.values(country.languages).map(lang => <li key={lang}>{lang}</li>)}
        </ul>
        <img src={country.flags.png} />
        <WeatherCard weatherData={weatherData} location={country.capital[0]} />
        </div>
    )
}

const WeatherCard = ({weatherData, location}) => {
    if (!weatherData) {
        return (
            <p>Could not get data for weather</p>
        )
    }

    const parseDir = (angle) => {
        if (angle > 337.5) return 'N'
        else if (angle > 292.5) return 'NW'
        else if (angle > 247.5) return 'W'
        else if (angle > 202.5) return 'SW'
        else if (angle > 157.5) return 'S'
        else if (angle > 112.5) return 'SE'
        else if (angle > 67.5) return 'E'
        else if (angle > 22.5) return 'NE'
        else return 'N'
    }
    
    return (
        <div>
        <h2>Weather in {location}</h2>
        <p>Temperature {Math.round(weatherData.main.temp - 273.15)}C&deg;</p>
        <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`}/>
        <p>Wind {weatherData.wind.speed}m/s {parseDir(weatherData.wind.deg)}</p>
        </div>
    )
}
export default App
