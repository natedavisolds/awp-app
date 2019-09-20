import React, {useState,useReducer,useEffect} from 'react'

const SectionContext = React.createContext()

const StepReducer = (state, action) => {
  switch(action.type) {
    case "INCREMENT_TOTAL":
      return {...state, total:(state.total + 1)}
    default:
  }
}

export const Sectioned = ({children,startStep=1,totalSteps=0,...props}) => {
  const [step, setStep] = useState(startStep)
  const [total,setTotal] = useState(totalSteps)

  const isStep = (candidate) => { return(candidate === step)}
  const next = () => setStep(step + 1)
  const previous = () => setStep(step - 1)

  const stepper = {isStep, next, previous, total, step}

  return(
    <SectionContext.Provider value={{stepper}}>
      { children }
    </SectionContext.Provider>
  )
}

export const SectionConsumer = Component => props => 
  <SectionContext.Consumer>
    { contextualProps => <Component {...contextualProps} {...props} />}
  </SectionContext.Consumer>

