const Countries = ({ countries, onShow }) => {
  return (
    <>
      {countries.map(country => (
        <div key={country.cca3}>
          {country.name.common}
          <button onClick={() => onShow(country)}>
            show
          </button>
        </div>
      ))}
    </>
  )
}

export default Countries
