import React, {useState,useEffect} from 'react'
import {UserConsumer} from '../UserContext'
import {PlaytimeConsumer} from '../PlaytimeContext'

import PlaytimeList from '../Playtimes/PlaytimeList'

import {filterPlaytimes} from '../Utils/PlaytimeUtils'

import GetPlaying from '../Playtimes/GetPlaying'

const ProfileContainer = ({user={},allPlaytimes={}, commands}) => {
  const [filteredPlaytimes, setFilteredPlaytimes] = useState([])

  useEffect(() => {
    const confirmedPlaytimes = user.confirmedPlaytimes

    if (confirmedPlaytimes !== undefined) {
      setFilteredPlaytimes(
        filterPlaytimes(allPlaytimes,confirmedPlaytimes)
      )
    }
  }, [user,allPlaytimes])

  return (
    <div>
      <div className="card text-center bg-light m-2">
        <p className="h2 card-body">
          <input type="text" className="transparent-input text-center" value={user.displayName} onChange={(e) => commands.updateUser({displayName: e.target.value})} />
        </p>
      </div>

      <h4 className="p-2 bg-light text-center">Gametime Decisions</h4>
  { filteredPlaytimes.length > 0 ? <PlaytimeList playtimes={filteredPlaytimes} /> : <GetPlaying /> }
    </div>
  )
}

export default UserConsumer(PlaytimeConsumer(ProfileContainer))