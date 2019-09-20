import React, {useEffect,useState} from 'react'

import {isPresent} from './Validations'
  
const LastNameFormGroup = ({signup}) => {
  const [validating, setValidating] = useState(false)
  const [errorState, setErrorState] = useState()
  const [valid, setValid] = useState(false)

  useEffect(() => setValid(isPresent(signup.lastName)), [signup.lastName])
  useEffect(() => ((validating) ? setErrorState(valid) : setErrorState(undefined)), [valid,validating])

  return(
    <div className="form-group">
      <label htmlFor="signupLastName">Last Name</label>
      <input type="text" 
        value={signup.lastName} 
        onChange={(e) => signup.update({lastName: e.target.value})} 
        name="signupLastName" 
        onBlur={() => setValidating(true)}
        className={`form-control ${errorState === false &&  'is-invalid'} ${errorState === true &&  'is-valid'}`}
        aria-label="Last Name"></input>
      <div className="invalid-feedback">You must enter your last name, like "Smith" or "Z".</div>
      <div className="valid-feedback">Hello.</div>
    </div>
  )
}

export default LastNameFormGroup