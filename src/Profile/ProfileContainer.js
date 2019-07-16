import React, {useState,useEffect} from 'react'
import {UserConsumer} from '../UserContext'
import {PlaytimeConsumer} from '../PlaytimeContext'

import PlaytimeList from '../Playtimes/PlaytimeList'

const ProfileContainer = ({user={},allPlaytimes={}}) => {
  const [filteredPlaytimes, setFilteredPlaytimes] = useState([])

  useEffect(() => {
    const confirmedPlaytimes = user.confirmedPlaytimes

    if (typeof confirmedPlaytimes !== undefined) {
      const playtimes = Object.values(confirmedPlaytimes).map((confirmedPlaytime) => {
        
        return confirmedPlaytime["playtimeId"]
      }).map((id) => {
        return (id !== undefined ? allPlaytimes[id] : undefined)
      }).filter((playtime) => { return typeof playtime !== undefined})
  
      setFilteredPlaytimes(playtimes)
    }
  }, [user,allPlaytimes])

  return (
    <div>
      <div className="card text-center bg-light m-2">
        <p className="h2 card-body">{user.displayName}</p>
      </div>

      <h4 className="p-2 bg-light text-center">Playtimes</h4>
      <PlaytimeList playtimes={filteredPlaytimes} />
    </div>
  )
}

export default UserConsumer(PlaytimeConsumer(ProfileContainer))