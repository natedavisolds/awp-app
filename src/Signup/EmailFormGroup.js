import React, {useState,useEffect} from 'react'
import {validateEmail} from './Validations'

const EmailFormGroup = ({signup}) => {
  const [validating, setValidating] = useState(false)
  const [errorState, setErrorState] = useState()
  const [valid, setValid] = useState(false)

  useEffect(() => setValid(validateEmail(signup.email)), [signup.email])
  useEffect(() => ((validating || valid) ? setErrorState(valid) : setErrorState(undefined)), [valid,validating])

  return(
    <div className="form-group">
      <label htmlFor="signupEmail">Email</label>
      <input type="email" value={signup.email} onBlur={() => setValidating(true)} onChange={(e) => signup.update({email: e.target.value})} name="signupEmail" className={`form-control ${errorState === false &&  'is-invalid'} ${errorState === true &&  'is-valid'}`} aria-label="Email"></input>
      <div className="invalid-feedback">Enter an email address, like name@domain.com</div>
      <div className="valid-feedback">Looks good!</div>
    </div>
  )
}

export default EmailFormGroup