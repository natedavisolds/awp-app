import React, {useState,useEffect} from 'react'
import {SectionConsumer} from './Sectioned'
import StepNavigation from './StepNavigation'

import FirstNameFormGroup from './FirstNameFormGroup'
import LastNameFormGroup from './LastNameFormGroup'
  
import {isPresent} from './Validations'

const SignupPersonal = SectionConsumer(({stepper,signup}) => {
  const [valid,setValid] = useState(false)
  const validate = () => setValid(isPresent(signup.firstName,signup.lastName))
  useEffect(validate,[signup.firstName,signup.lastName])

  return(
    <form>
      <FirstNameFormGroup signup={signup} />
      <LastNameFormGroup signup={signup} />
      <StepNavigation valid={valid} next={stepper.next} previous={stepper.previous} />
    </form>
  )
})

export default SignupPersonal