import { useState, useEffect } from "react"
import Filter from "./components/Filter"
import CountryList from "./components/CountryList"
import CountryDetails from "./components/CountryDetails"
import countriesService from "./services/countries"


const App = () => {
  const [countries, setCountries] = useState([])
  const [query, setQuery] = useState("")
  const [showCountry, setShowCountry] = useState(null)

  useEffect(() => {
    countriesService.getAll().then(data => setCountries(data))
  }, [])

  const handleFilterChange = (e) => {
    setQuery(e.target.value)
    setShowCountry(null) // reset shown country
  }

  const filtered = countries.filter(c =>
    c.name.common.toLowerCase().includes(query.toLowerCase())
  )

  const handleShow = (name) => {
    const country = countries.find(c => c.name.common === name)
    setShowCountry(country)
  }

  return (
    <div>
      <Filter value={query} onChange={handleFilterChange} />

      {showCountry ? (
        <CountryDetails country={showCountry} />
      ) : filtered.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : filtered.length === 1 ? (
        <CountryDetails country={filtered[0]} />
      ) : (
        <CountryList countries={filtered} onShow={handleShow} />
      )}
    </div>
  )
}

export default App
