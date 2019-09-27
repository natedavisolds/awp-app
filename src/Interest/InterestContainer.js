import React, {useState,useReducer,useEffect} from 'react'
import './interest-button.css'

import _ from 'lodash'
import { findIconDefinition } from '@fortawesome/fontawesome-svg-core';

const InterestButton = ({label="", value=0, onIncrease}) => 
  <button 
    className={`interest-btn interest-btn-${value}`} 
    onClick={(e) => {
      e.preventDefault(); 
      if (onIncrease) { onIncrease(value >= 4 ? 0 : (value + 1)) }
    }}>{label}</button>

const InterestReducer = (state={},action) => {
  const {type,day,timeslot,value} = action

  switch(type) {
    case "CHANGE_INTEREST":
      const changedDay = Object.assign({},state[day],{dayInterest:true},{[timeslot]:value})
      return(Object.assign({},state,{[day]:changedDay}))
    case "CHANGE_DAY_INTEREST":
      console.info("CHANGE_DAY_INTEREST")
      const newDay = Object.assign({},state[day],{dayInterest:(value === true)})
      return(Object.assign({},state,{[day]:newDay}))
    default:
      return(state)
  }
}

const InterestGrid = ({days=["Mo","Tu","We","Th","Fr","Sa","Su"]}) => {
  const [userInterest,dispatch] = useReducer(InterestReducer,{})

  const findInterest = (day,timeslot) => {
    const dayInterest = userInterest[day]

    if (dayInterest) {
      const timeslotInterest = dayInterest[timeslot]
      return(timeslotInterest ? timeslotInterest : 0)
    } else {
      return(0)
    }
  }

  useEffect(() => console.info(userInterest),[userInterest])

  const toggleDayInterest = (day) => {
    console.info("toggleDayInterest")
    const current = userInterest[day] && userInterest[day].dayInterest === true
    dispatch({
      type:"CHANGE_DAY_INTEREST",
      day,
      value: !current
    })
  }

  const increaseInterest = (day,timeslot,value) => {
    dispatch({
      type: "CHANGE_INTEREST",
      day,
      timeslot,
      value
    })
  }

  const isShowingDay = (day) => {
    const currentDay = userInterest[day] 
    if (currentDay) {
      return(currentDay.dayInterest === true)
    } else { return(false) }
  }

  return(
    <div className="interest-grid">
      <table className="interest-table">
        <thead>
          <tr>
            { days.map(day => <td key={day} className={`interest-table-col-header ${ isShowingDay(day) && 'interested'}`} onClick={() => toggleDayInterest(day)} scope="col">{day}</td>) }
          </tr>
        </thead>
        <tbody>
          { Timeslots.map(timeslot => 
            <tr key={`row-${timeslot}`} className="interest-table-row">
              { _.times(days.length, dayNumber =>  
                <td key={`${dayNumber}-${timeslot}`} className="interest-table-cell">
                  { isShowingDay(days[dayNumber]) && <InterestButton label={timeslot} value={findInterest(days[dayNumber],timeslot)} onIncrease={(level) => increaseInterest(days[dayNumber],timeslot,level)} /> }
                </td>
                ) 
              }
            </tr>
          )}
        </tbody>
      </table> 
    </div>
  )
}

const Timeslots = ["< 9", "9-11","11-1","1-3","3-5","5-7","> 7"]

const InterestContainer = () => {
  return(
    <div>
      <p className="p-2 text-center">Choose the days to play this week</p>

      <InterestGrid />
    </div>
  )
}
  
export default InterestContainer