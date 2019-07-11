import React from 'react'

const PlaytimeListing = ({playtime}) =>
  <a href={ `/playtimes/${playtime.id}` } className="list-group-item list-group-item-action">
    <div className="d-flex w-100 justify-content-between">
      <h5 className="mb-1">{playtime.title}</h5>
      <small>{playtime.playAt }</small>
    </div>
    { playtime.confirmedAt ? <small>You are playing</small> : ""}
    { playtime.description && <p className="mb-1">{playtime.description}</p> }
  </a>

export default PlaytimeListing