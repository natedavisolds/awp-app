import React, {useState} from 'react'
import QueryFilter from './QueryFilter'
import PlaytimeList from './PlaytimeList'

const PlaytimeContainer = ({allPlaytimes=[]}) => {
    const [playtimes, setPlaytimes] = useState(Object.values(allPlaytimes))
  
    const filterPlaytimes = (query) => {
      const regex = new RegExp("" + query + "", "i")
  
      if (query === "" || typeof query === undefined) {
        setPlaytimes(Object.values(allPlaytimes))
      } else {
        setPlaytimes(Object.values(allPlaytimes).filter(playtime => regex.test(playtime.title)))
      }
    }
  
    return (
      <div>
        <QueryFilter onChange={filterPlaytimes} />
        <PlaytimeList playtimes={playtimes} />
      </div>
    );
  }

export default PlaytimeContainer;