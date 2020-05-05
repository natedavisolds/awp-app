import React from 'react'
import InterestGrid from './InterestGrid'

const InterestContainer = () => {
  return(
    <div>
      <p className="p-2 text-center">Choose the days to play this week</p>

      <InterestGrid />
    </div>
  )
}
  
export default InterestContainer