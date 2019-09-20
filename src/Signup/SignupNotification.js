import React, {useState,useEffect} from 'react'
import {SectionConsumer} from './Sectioned'
import {validateEmail,validatePhone} from './Validations'
import StepNavigation from './StepNavigation'

import PhoneFormGroup from './PhoneFormGroup'
import EmailFormGroup from './EmailFormGroup'

const SignupNotification = SectionConsumer(({stepper,signup}) => {
  const [valid,setValid] = useState(false)

  const validate = () => setValid(
    validateEmail(signup.email) &&
    validatePhone(signup.phone)
  )

  useEffect(validate,[signup.email,signup.phone])

  return (
    <form>
      <EmailFormGroup signup={signup} />
      <PhoneFormGroup signup={signup} />
      <StepNavigation valid={valid} next={stepper.next} />
    </form>

  )
})

export default SignupNotification