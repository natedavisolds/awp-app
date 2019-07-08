import React from 'react'
import PlaytimeListing from './PlaytimeListing'

const PlaytimeList = ({playtimes=[]}) => 
  <div className="list-group list-group-flush">
    { playtimes.map(playtime => <PlaytimeListing key={playtime.id} playtime={playtime} />) }
  </div>

export default PlaytimeList