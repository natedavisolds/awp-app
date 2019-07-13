import React from 'react'

const PlayCommited = () =>
  <div className="p-2 nav nav-justified justify-content-center">
    <p> You're playing
    <button type="button" className="m-1 btn btn-danger nav-link nav-item">Change of plans</button>
    </p>
  </div>

const PlayDecision = () => 
  <div className="p-2 nav nav-justified justify-content-center">
      <button type="button" className="m-1 btn btn-success nav-link nav-item">I'll Play</button>
      <button type="button" className="m-1 btn btn-secondary nav-link nav-item">Sit out</button>
  </div>

const PlaytimePane = ({playtime}) => 
  <div className="pane p-3">
    
    <div className="card text-center bg-light">
      <div className="card-body">
        <p className="card-title display-4">{playtime.title}</p>
        <p className="card-text lead">{playtime.location} @ {playtime.playAt }</p>
        <PlayCommited />
      </div>
    </div>
    
    {playtime.description && <p>{playtime.description}</p>}

    
  </div>

export default PlaytimePane