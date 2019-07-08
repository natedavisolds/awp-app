import React from 'react'

const PlaytimeListing = ({playtime}) =>
  <a href={ `/playtimes/${playtime.id}` } onClick={(e) => e.preventDefault() } className="list-group-item list-group-item-action">
    <div className="d-flex w-100 justify-content-between">
      <h5 className="mb-1">{playtime.title}</h5>
      <small>{playtime.playAt }</small>
    </div>
    { playtime.confirmedAt ? <small>You are playing</small> : ""}
    <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
  </a>

export default PlaytimeListing