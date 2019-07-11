import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {PlaytimeConsumer} from '../PlaytimeContext'

const PlaytimePane = ({playtime}) => 
  <div className="pane p-3">
    
    <h1>{playtime.title}</h1>
    { playtime.location && <p>@{playtime.location}</p>}
    { playtime.description && <div><p>{playtime.description}</p></div>}

    <small>{playtime.id}</small>
  </div>

const PlaytimeContainer = ({match, allPlaytimes={}}) => {
  const [playtime, setPlaytime] = useState({})
  
  useEffect(() => {
    setPlaytime(allPlaytimes[match.params["playtimeId"]])
  }, [match])

  return (
    <div>
      <div className="navbar bg-light pane-header">
        <Link to="/playtimes" className="btn btn-secondary">&lt; Playtimes</Link>
      </div>
      { playtime && <PlaytimePane playtime={playtime} /> } 
    </div>
  )
}

export default PlaytimeConsumer(PlaytimeContainer)