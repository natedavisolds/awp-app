import React, {useState, useEffect} from 'react'
import ConditionalButton from './ConditionalButton'
import {SectionConsumer} from './Sectioned'
import {validatePasswordMatch} from './Validations'

const SignupFinalize = SectionConsumer(({signup, stepper, onSignup}) => {  
  const [validating, setValidating] = useState(false)
  const [validatingPassword, setValidatingPassword] = useState(false)
  const [errorState, setErrorState] = useState()
  const [valid, setValid] = useState(false)

  useEffect(() => setValid(
    validatePasswordMatch(signup.password,signup.passwordConfirm)
  ), [signup.password,signup.passwordConfirm])

  useEffect(() => ((validating && validatingPassword) ? setErrorState(valid) : setErrorState(undefined)), [valid,validating,validatingPassword])

  return (
    <form>
      <div className="form-group">
        <label htmlFor="signupPhone">Password</label>
        <input type="password" 
          onBlur={() => setValidatingPassword(true) } 
          onChange={(e) => signup.update({password: e.target.value})} name="signupPhone" 
          className={`form-control mb-2 ${errorState === false &&  'is-invalid'} ${errorState === true &&  'is-valid'}`}
          aria-label="Password"
          placeholder="Enter a password"></input>
        <input type="password" name="signupPhone2" 
          onBlur={() => setValidating(true)} 
          onChange={(e) => signup.update({passwordConfirm: e.target.value})} 
          className={`form-control ${errorState === false &&  'is-invalid'} ${errorState === true &&  'is-valid'}`}
          aria-label="Re-enter Password"
          placeholder="Re-type your password"></input>
          <div className="invalid-feedback">Passwords don't match. Please, type them again.</div>
          <div className="valid-feedback">Matching.</div>
      </div>
      
      <div className="form-group">
        <a href="#" className="btn btn-outline-secondary mr-2" onClick={(e) => {e.preventDefault(); stepper.previous()}}>Previous</a>
        <ConditionalButton valid={signup.valid} onClick={onSignup}>Sign up</ConditionalButton>
      </div>
    </form>
  )
})

export default SignupFinalize