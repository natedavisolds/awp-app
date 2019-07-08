import React, {useState, useEffect} from 'react'

let timer;

const QueryFilter = ({onChange}) => {
    const [query, setQuery] = useState("")
  
    const handleQueryChange = (e) => {
      e.preventDefault(); 
      setQuery(e.target.value)
    }
  
    useEffect(() => {
      clearTimeout(timer)
      timer = setTimeout(() => { 
        onChange(query)
      },300)
    },[query,onChange])
  
    return (
      <div className="input-group mb-3">
        <input type="text" className="form-control" onChange={handleQueryChange} placeholder="Filter" aria-label="Filter" aria-describedby="button-filter" />
      </div>
    )
  }

  export default QueryFilter