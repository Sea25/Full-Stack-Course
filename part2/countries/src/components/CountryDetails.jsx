import Weather from "./Weather"

const CountryDetails = ({ country }) => (
  <div>
    <h2>{country.name.common}</h2>
    <p>Capital: {country.capital?.[0]}</p>
    <p>Area: {country.area}</p>
    <h4>Languages:</h4>
    <ul>
      {country.languages && Object.values(country.languages).map(lang => (
        <li key={lang}>{lang}</li>
      ))}
    </ul>
    <img src={country.flags?.png} alt={`Flag of ${country.name.common}`} width="150" />
    {country.capital && <Weather city={country.capital[0]} />}
  </div>
)

export default CountryDetails
