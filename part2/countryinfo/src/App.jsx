import { useState, useEffect } from 'react'
import countryService from './services/restcountries'

const App = () => {
    const [searchstr, setSearchstr] = useState('')
    const [searchResults, setSearchResults] = useState([])

    const handleSearchChange = (event) => {
        const newstr = event.target.value
        setSearchstr(newstr)
        countryService
            .get(newstr)
            .then(data => {
                if (data.length < 11) {
                    setSearchResults(data)
                }

            })
    }

    return (
        <div>
        <SearchBox changeHandler={handleSearchChange}/>
        </div>
    )
}

const SearchBox = ({changeHandler}) => {
    return (
        <form>
        <div>find countries <input onChange={changeHandler}/></div>
        </form>
    )
}
const Results = () => {
    return
}
export default App
