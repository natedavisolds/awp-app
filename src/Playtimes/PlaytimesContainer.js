import React, {useState, useEffect} from 'react'
import QueryFilter from './QueryFilter'
import PlaytimeList from './PlaytimeList'
import {PlaytimeConsumer} from '../PlaytimeContext'

import DateUtils from '../Utils/DateUtils'
import FacetFilter from './FacetFilter'

import PlaytimeFacets from '../Data/PlaytimeFacets.json'

const filterPlaytimes = (query, playtimes) => {
  const regex = new RegExp("" + query + "", "i")

  if (query === "" || typeof query === undefined) {
    return playtimes
  } else {
    return playtimes.filter(playtime => regex.test(playtime.title))
  }
}

const facettedPlaytimes = (facet, playtimes=[]) => {
  switch(facet) {
    case 'playing':
      return playtimes.filter(playtime => playtime.confirmedAt ? true : false )
    case 'soon':
      return playtimes.filter(playtime => DateUtils.laterThan(playtime.playAt, Date.now()) )
    case 'past':
        return playtimes.filter(playtime => DateUtils.earlierThan(playtime.playAt, Date.now()) )
    case 'new':
      return playtimes.filter(playtime => DateUtils.laterThan(playtime.createdAt, Date.now()))
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
        <FacetFilter onChange={facetChange} currentFacet={facet} facets={Object.values(PlaytimeFacets)} />
        <QueryFilter onChange={queryChange} />
        <PlaytimeList playtimes={filteredPlaytimes} />
      </div>
    );
  }

export default PlaytimeConsumer(PlaytimeContainer);