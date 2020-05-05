import React, {useReducer,useEffect} from 'react'
import _ from 'lodash'

import InterestButton from './InterestButton'
import {Timeslots} from './Timeslots'

const InterestReducer = (state={},action) => {
  const {type,day,timeslot,value} = action

  switch(type) {
    case "CHANGE_INTEREST":
      const changedDay = Object.assign({},state[day],{dayInterest:true},{[timeslot]:value})
      return(Object.assign({},state,{[day]:changedDay}))
    case "CHANGE_DAY_INTEREST":
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
      return(timeslotInterest !== undefined ? timeslotInterest : -1)
    } else {
      return(-1)
    }
  }

  const toggleDayInterest = (day) => {
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
                <td key={`${dayNumber}-${timeslot}`} className={`interest-table-cell ${!isShowingDay(days[dayNumber]) && 'interest-table-hidden'}`}>
                  <InterestButton label={timeslot} value={findInterest(days[dayNumber],timeslot)} onIncrease={(level) => increaseInterest(days[dayNumber],timeslot,level)} /> 
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

export default InterestGrid