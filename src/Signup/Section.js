import React, {useState,useEffect} from 'react'
import {SectionConsumer} from './Sectioned'

const Section = SectionConsumer(({forStep, stepper, children}) => {
  return(
    <>
      { stepper.isStep(forStep) ? children : "" }
    </>
  )
})

export default Section