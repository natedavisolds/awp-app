import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {PlaytimeConsumer} from '../PlaytimeContext'

const PlaytimeDescription = ({playtime}) => 
  <>
  <small>{playtime.id}</small>
  <h1>{playtime.title}</h1>
  </>

const PlaytimeContainer = ({match, allPlaytimes={}}) => {
  const [playtime, setPlaytime] = useState({})
  
  useEffect(() => {
    setPlaytime(allPlaytimes[match.params["playtimeId"]])
  }, [match])

  return (
    <div>
      <div>
        <Link to="/playtimes" >&lt; Back</Link>
      </div>
      { playtime && <PlaytimeDescription playtime={playtime} /> } 
    </div>
  )
}

export default PlaytimeConsumer(PlaytimeContainer)