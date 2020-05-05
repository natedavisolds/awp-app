import React from 'react'
import './interest-button.css'

const incrementValue = currentValue => {
  if (currentValue === -1) {
    return(1)
  } else {
    return(currentValue >= 4 ? 0 : (currentValue + 1))
  }
}

const InterestButton = ({label="", value=0, onIncrease}) => 
  <button 
    className={`interest-btn interest-btn-${value}`} 
    onClick={(e) => {
      e.preventDefault(); 
      if (onIncrease) { onIncrease(incrementValue(value)) }
    }}>{label}</button>

export default InterestButton