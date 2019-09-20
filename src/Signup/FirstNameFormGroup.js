import React, {useEffect,useState} from 'react'

import {isPresent} from './Validations'

const FirstNameFormGroup = ({signup}) => {
  const [validating, setValidating] = useState(false)
  const [errorState, setErrorState] = useState()
  const [valid, setValid] = useState(false)

  useEffect(() => setValid(isPresent(signup.firstName)), [signup.firstName])
  useEffect(() => ((validating) ? setErrorState(valid) : setErrorState(undefined)), [valid,validating])

  return(
    <div className="form-group">
      <label htmlFor="signupFirstName">First Name</label>
      <input type="text" value={signup.firstName} 
        onChange={(e) => signup.update({firstName: e.target.value})} 
        name="signupFirstName" 
        onBlur={() => setValidating(true)}
        className={`form-control ${errorState === false &&  'is-invalid'} ${errorState === true &&  'is-valid'}`}
        aria-label="First Name"></input>
      <div className="invalid-feedback">You must enter your first name, like "Betsy" or "A".</div>
      <div className="valid-feedback">Hi, {signup.firstName}!</div>
    </div>
  )
}

export default FirstNameFormGroup