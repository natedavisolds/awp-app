import React, {useState,useEffect} from 'react'
import {UserConsumer} from '../UserContext'

const PlayCommited = ({onChangePlans,committed}) =>
  <>
  <p className="h4">{ committed.playing ? "You're playing" : "You're sitting this one out" }</p>
  <div className="p-2 nav nav-justified justify-content-center">
    <button type="button" onClick={() => onChangePlans()} className="m-1 btn btn-danger nav-link nav-item">Change of plans</button>
  </div>
  </>

const PlayDecision = ({onSitOut,onPlay}) => 
  <div className="p-2 nav nav-justified justify-content-center">
      <button type="button" onClick={() => onPlay()} className="m-1 btn btn-success nav-link nav-item">I'll Play</button>
      <button type="button" onClick={() => onSitOut()} className="m-1 btn btn-secondary nav-link nav-item">Sit out</button>
  </div>

const PlaytimePane = ({playtime,user, commands}) => {
  const [committed, setCommitted] = useState()

  useEffect(() => {
    if (!user.confirmedPlaytimes) { return }
    const userCommitted = Object.values(user.confirmedPlaytimes).find((confirmed) => (confirmed.playtimeId === playtime.id))
    setCommitted(userCommitted) 
  },[playtime, user])

  const play = () => {
    commands.confirmPlaytime(playtime)
  }

  const sitOut = () => {
    commands.sitoutPlaytime(playtime)
  }

  const changePlans = ()  => {
    commands.changePlaytime(playtime)
  }

  return (
    <div className="pane p-3">
      <div className="card text-center bg-light">
        <div className="card-body">
          <p className="card-title display-4">{playtime.title}</p>
          <p className="card-text lead">{playtime.location} @ {playtime.playAt }</p>
          {  committed !== undefined ? 
          <PlayCommited onChangePlans={changePlans} committed={committed} /> 
          : 
          <PlayDecision onPlay={play} onSitOut={sitOut}/> 
          }
        </div>
      </div>
      
      {playtime.description && <p>{playtime.description}</p>}
    </div>
  )
}
  

export default UserConsumer(PlaytimePane)