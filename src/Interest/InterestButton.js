import React from 'react'
import './interest-button.css'

const incrementValue = (currentValue, maxValue=4) => {
  if (currentValue === -1) {
    return(1)
  } else {
    return(currentValue >= maxValue ? 0 : (currentValue + 1))
  }
}

const InterestButton = ({label="", value=0, onIncrease, maxValue=2}) => 
  <button 
    className={`interest-btn interest-btn-${value} ${value === maxValue ? 'interest-btn-max' : ''}`} 
    onClick={(e) => {
      e.preventDefault(); 
      if (onIncrease) { onIncrease(incrementValue(value,maxValue)) }
    }}>{label}</button>

export default InterestButton