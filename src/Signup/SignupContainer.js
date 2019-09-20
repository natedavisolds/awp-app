import React, {useState,useEffect,useReducer} from 'react'

import {defaultFormInfo} from './defaultFormInfo'
import {Sectioned} from './Sectioned'
import Section from './Section'
import SignupNotification from './SignupNotification'
import SignupPersonal from './SignupPersonal'
import SignupFinalize from './SignupFinalize'
import { isPresent, isEmail, isPhone, validatePasswordMatch } from './Validations'

const SignedUp = ({startAgain}) =>
  <>
    <h3>Thanks for Signing up.</h3>
    <p><a href="/playtimes" className="btn btn-primary">Begin by browsing playtimes</a></p>
    <p><a href="#startagain" onClick={(e) => {e.preventDefault(); startAgain()}}>Sign someone else up</a></p>
  </>

const SignupWizard = ({signUp,onSignup}) => 
  <>
    <h1>Sign up</h1>
    <Sectioned totalSteps={3}>
      <Section forStep={1}>
        <SignupNotification signup={signUp} />
      </Section>

      <Section forStep={2}>
        <SignupPersonal signup={signUp} /> 
      </Section>

      <Section forStep={3}>
        <SignupFinalize signup={signUp} onSignup={onSignup} />
      </Section>
    </Sectioned>
  </>

const SignupContainer = () => {
  const [signupInfo, setSignupInfo] = useState(defaultFormInfo)
  const [valid,setValid] = useState(false)
  const [completed, setCompleted] = useState(false)

  const updateInfo = (info={}) => {
    setSignupInfo(Object.assign({},signupInfo,info))
  }

  const onSignup = () => { setCompleted(true) }
  const startAgain = () => {
    setSignupInfo(defaultFormInfo)
    setCompleted(false)
  } 

  const validate = () => {
    const result = (
      isPresent(signupInfo.firstName,signupInfo.lastName) &&
      isPresent(signupInfo.email,signupInfo.phone) &&
      isPresent(signupInfo.password,signupInfo.passwordConfirm) &&
      isEmail(signupInfo.email) &&
      isPhone(signupInfo.phone) &&
      validatePasswordMatch(signupInfo.password,signupInfo.passwordConfirm)
    )

    setValid(result)
  }

  useEffect(validate,[signupInfo])

  const signUp = {
    ...signupInfo,
    update: updateInfo,
    valid
  }
  
  return (
    <div className="p-3">
      <div className="container p-0">
        { completed ? 
          <SignedUp startAgain={startAgain} />
          :
          <SignupWizard signUp={signUp} onSignup={onSignup} />
        }
      </div>
    </div>
  )
}

export default SignupContainer