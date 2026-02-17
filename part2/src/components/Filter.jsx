const Filter = ({ filter, handleFilterChange }) => {
  return (
    <div>
      search:
      <input value={filter} onChange={handleFilterChange} />
    </div>
  )
}

export default Filter
