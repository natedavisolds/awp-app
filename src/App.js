import React, {useState,useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

const allPlaytimes = {
  "1" : { 
    id: "1",
    title: "Playtime 1",
    playAt: "Today",
    confirmedAt: "2016-06-01 0:0"
  },
  "2" : { 
    id: "2",
    title: "Playtime 2",
    playAt: "Monday",
    confirmedAt: null
  }
}

const PlaytimeListing = ({playtime}) =>
  <a href={ `/playtimes/${playtime.id}` } onClick={(e) => e.preventDefault() } className="list-group-item list-group-item-action">
    <div className="d-flex w-100 justify-content-between">
      <h5 className="mb-1">{playtime.title}</h5>
      <small>{playtime.playAt }</small>
    </div>
    { playtime.confirmedAt ? <small>You are playing</small> : ""}
    <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
    
  </a>

const PlaytimeList = ({playtimes={}}) => 
  <div className="list-group list-group-flush">
    { playtimes.map(playtime => <PlaytimeListing key={playtime.id} playtime={playtime} />) }
  </div>

let timer;

const Query = ({onChange}) => {
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

function App() {
  const [playtimes, setPlaytimes] = useState(Object.values(allPlaytimes))

  const filterPlaytimes = (query) => {
    const regex = new RegExp("" + query + "", "i")

    if (query === "" || typeof query === undefined) {
      setPlaytimes(Object.values(allPlaytimes))
    } else {
      setPlaytimes(Object.values(allPlaytimes).filter(playtime => regex.test(playtime.title)))
    }
  }

  return (
    <div className="">
      <Query onChange={filterPlaytimes} />
      <PlaytimeList playtimes={playtimes} />
    </div>
  );
}

export default App;
