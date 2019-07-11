import React, {useState, useEffect} from 'react'
import QueryFilter from './QueryFilter'
import PlaytimeList from './PlaytimeList'
import {PlaytimeConsumer} from '../PlaytimeContext'

const activeClass = (candidate, baseFacet) => {
  return candidate === baseFacet ? 'active' : ''
}

const defaultActiveClass = (candidate, baseFacet) => {
  if (candidate === '' || typeof candidate === undefined) {
    return 'active'
  } else {
    return activeClass(candidate,baseFacet)
  }
}

const FacetFilter = ({onChange, currentFacet=""}) => 
  <ul className="nav nav-pills nav-fill p-2">
    <li className={`nav-item nav-link ${defaultActiveClass(currentFacet,'any')}`} onClick={() => onChange('any') }>
      Any</li>
    <li className={`nav-item nav-link ${activeClass(currentFacet,'playing')}`} onClick={() => onChange('playing') }>Playing</li>
    <li className={`nav-item nav-link ${activeClass(currentFacet,'soon')}`} onClick={() => onChange('soon') }>Soon</li>
    <li className={`nav-item nav-link ${activeClass(currentFacet,'past')}`} onClick={() => onChange('past') }>Past</li>
    <li className={`nav-item nav-link ${activeClass(currentFacet,'new')}`} onClick={() => onChange('new') }>New</li>
  </ul>


const filterPlaytimes = (query, playtimes) => {
  const regex = new RegExp("" + query + "", "i")

  if (query === "" || typeof query === undefined) {
    return playtimes
  } else {
    return playtimes.filter(playtime => regex.test(playtime.title))
  }
}

const laterThanDate = (candidate, comparedTo) => {
  return Date.parse(candidate) >= comparedTo 
}

const earlierThanDate = (candidate, comparedTo) => {
  return Date.parse(candidate) < comparedTo 
}

const facettedPlaytimes = (facet, playtimes=[]) => {
  switch(facet) {
    case 'playing':
      return playtimes.filter(playtime => playtime.confirmedAt ? true : false )
    case 'soon':
      return playtimes.filter(playtime => laterThanDate(playtime.playAt, Date.now()) )
    case 'past':
        return playtimes.filter(playtime => earlierThanDate(playtime.playAt, Date.now()) )
    case 'new':
      return playtimes.filter(playtime => laterThanDate(playtime.createdAt, Date.now()))
    default:
      return playtimes
  }
}

const PlaytimeContainer = ({playtimes}) => {
    const [filteredPlaytimes, setFilteredPlaytimes] = useState(playtimes);
    const [facet, setFacet] = useState("playing");
    const [query, setQuery] = useState("");

    const queryChange = (newQuery) => setQuery(newQuery)
    const facetChange = (newFacet) => setFacet(newFacet)
    
    useEffect(() => {
      setFilteredPlaytimes(
        filterPlaytimes(query,
          facettedPlaytimes(facet,playtimes)
        )
      )
    }, [facet, query, playtimes])

    return (
      <div>
        <FacetFilter onChange={facetChange} currentFacet={facet} />
        <QueryFilter onChange={queryChange} />
        <PlaytimeList playtimes={filteredPlaytimes} />
      </div>
    );
  }

export default PlaytimeConsumer(PlaytimeContainer);