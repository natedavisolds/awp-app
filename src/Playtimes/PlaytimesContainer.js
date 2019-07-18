import React, {useState, useEffect} from 'react'
import QueryFilter from './QueryFilter'
import PlaytimeList from './PlaytimeList'
import {PlaytimeConsumer} from '../PlaytimeContext'
import {UserConsumer} from '../UserContext'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import DateUtils from '../Utils/DateUtils'
import FacetFilter from './FacetFilter'

import PlaytimeFacets from '../Data/PlaytimeFacets.json'

import {filterPlaytimes as filterPlaytimesWithin} from '../Utils/PlaytimeUtils'

const filterPlaytimes = (query, playtimes) => {
  const regex = new RegExp("" + query + "", "i")

  if (query === "" || typeof query === undefined) {
    return playtimes
  } else {
    return playtimes.filter(playtime => regex.test(playtime.title))
  }
}

const filterConfirmedPlaying = (confirmedPlaytimes=[]) => confirmedPlaytimes.filter(confirmed => confirmed["playing"] === true)

const facettedPlaytimes = (facet, playtimes=[],user) => {
  switch(facet) {
    case 'playing':
      return (user ? filterPlaytimesWithin(playtimes,filterConfirmedPlaying(Object.values(user.confirmedPlaytimes))) : [])
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
const facetFromUrl = ({params}) => {
  switch(params.facet) {
    case "soon":
    case "past":
    case "any":
      return params.facet
    default:
      return "playing"
  }
}

const PlaytimeContainer = ({playtimes, match, user}) => {
    const [filteredPlaytimes, setFilteredPlaytimes] = useState(playtimes);
    const [facet, setFacet] = useState(facetFromUrl(match));
    const [query, setQuery] = useState("");
    const [displaySearch, setDisplaySearch] = useState(false)

    const queryChange = (newQuery) => setQuery(newQuery)
    const facetChange = (newFacet) => setFacet(newFacet)
    
    const showSearch = () => { 
      setDisplaySearch(!displaySearch) 
    }

    useEffect(() => {
      setFilteredPlaytimes(
        filterPlaytimes(query,
          facettedPlaytimes(facet,playtimes,user)
        )
      )
    }, [facet, query, playtimes,user])

    return (
      <div>
        <FacetFilter onChange={facetChange} currentFacet={facet} facets={Object.values(PlaytimeFacets)}>
          <li className="nav-item nav-link" onClick={(e) => {e.preventDefault(); showSearch()} }>
            <FontAwesomeIcon icon="search" />
          </li>
        </FacetFilter>
        { displaySearch && <QueryFilter onChange={queryChange} /> }
        <PlaytimeList playtimes={filteredPlaytimes} />
      </div>
    );
  }

export default UserConsumer(PlaytimeConsumer(PlaytimeContainer));