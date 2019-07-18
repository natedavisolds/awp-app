import React from 'react'
import {Link} from 'react-router-dom'

const determineActive = (candidate, baseFacet, isDefault) => 
  candidate === baseFacet || (isDefault && (candidate === '' || typeof candidate === undefined))

const FacetFilterItem = ({facet,isActive=false,onSelect}) => 
  <li className={`nav-item`} onClick={(e) => {e.preventDefault(); onSelect(facet.key)} }>
    <Link to={`/play/${facet.key}`} className={`nav-link ${isActive ? 'active' : ''}`}>{facet.label}</Link>
  </li>

const FacetFilter = ({children, onChange, currentFacet="", facets=[]}) => 
  <ul className="nav nav-pills nav-fill p-2">
    { facets.map(facet => <FacetFilterItem isActive={determineActive(currentFacet,facet.key,(facet.default === true))} key={facet.key} facet={facet} onSelect={() => onChange(facet.key)} /> ) }
    { children }
  </ul>

export default FacetFilter