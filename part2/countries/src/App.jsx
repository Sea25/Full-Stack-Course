import { useState, useEffect } from 'react'
import countryService from './services/countries'
import Search from './components/Search'
import Countries from './components/Countries'
import Country from './components/Country'

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(() => {
    countryService.getAll().then(response => {
      setCountries(response.data)
    })
  }, [])

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
    setSelectedCountry(null)
  }

  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <Search value={search} onChange={handleSearchChange} />

      {filteredCountries.length > 10 &&
        <p>Too many matches, specify another filter</p>
      }

      {filteredCountries.length <= 10 &&
        filteredCountries.length > 1 &&
        filteredCountries.map(country =>
          <div key={country.cca3}>
            {country.name.common}
            <button onClick={() => setSelectedCountry(country)}>
              show
            </button>
          </div>
        )
      }

      {filteredCountries.length === 1 &&
        <Country country={filteredCountries[0]} />
      }

      {selectedCountry &&
        <Country country={selectedCountry} />
      }
    </div>
  )
}

export default App
