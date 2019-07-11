import React from 'react'

const determineActive = (candidate, baseFacet, isDefault) => 
  candidate === baseFacet || (isDefault && (candidate === '' || typeof candidate === undefined))

const FacetFilterItem = ({facet,isActive=false,onSelect}) => 
  <li className={`nav-item nav-link ${isActive ? 'active' : ''}`} onClick={(e) => {e.preventDefault(); onSelect(facet.key)} }>{facet.label}</li>

const FacetFilter = ({onChange, currentFacet="", facets=[]}) => 
  <ul className="nav nav-pills nav-fill p-2">
    { facets.map(facet => <FacetFilterItem isActive={determineActive(currentFacet,facet.key,(facet.default === true))} key={facet.key} facet={facet} onSelect={() => onChange(facet.key)} /> ) }
  </ul>

export default FacetFilter