import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {PlaytimeConsumer} from '../PlaytimeContext'
import PlaytimePane from './PlaytimePane'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const PlaytimeContainer = ({match, allPlaytimes={}}) => {
  const [playtime, setPlaytime] = useState({})
  
  useEffect(() => {
    setPlaytime(allPlaytimes[match.params["playtimeId"]])
  }, [match,allPlaytimes])

  return (
    <div>
      <div className="navbar bg-light pane-header">
        <Link to="/playtimes" className="btn btn-link"><FontAwesomeIcon icon="angle-left" /> Playtimes</Link>
      </div>
      { playtime && <PlaytimePane playtime={playtime} /> } 
    </div>
  )
}

export default PlaytimeConsumer(PlaytimeContainer)