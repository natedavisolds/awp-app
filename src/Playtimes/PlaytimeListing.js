import React from 'react'

const PlaytimeListing = ({playtime}) =>
  <a href={ `/playtimes/${playtime.id}` } className="list-group-item list-group-item-action">
    <div className="d-flex w-100 justify-content-between">
      <p className="mb-1 h3">{playtime.title}</p>
      <small>{playtime.playAt } { playtime.location && <small><br />@{playtime.location}</small>}</small>
    </div>
  </a>

export default PlaytimeListing