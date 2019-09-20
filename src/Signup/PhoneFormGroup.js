import React, {useState,useEffect} from 'react'
import {validatePhone} from './Validations'

const PhoneFormGroup = ({signup}) => {
  const [validating, setValidating] = useState(false)
  const [errorState, setErrorState] = useState()
  const [valid, setValid] = useState(false)

  useEffect(() => setValid(validatePhone(signup.phone)), [signup.phone])
  useEffect(() => ((validating || valid) ? setErrorState(valid) : setErrorState(undefined)), [valid,validating])

  const update = value => signup.update({phone: value})

  return(
    <div className="form-group">
      <label htmlFor="signupPhone">Phone</label>
      <input 
        type="phone" 
        value={signup.phone} 
        onChange={(e) => update(e.target.value) } 
        onBlur={() => setValidating(true) }
        name="signupPhone" 
        className={`form-control ${errorState === true && 'is-valid'} ${errorState === false && 'is-invalid'}`} 
        aria-label="Enter phone number" 
        />
      <div className="invalid-feedback">Should be a 10-digit number with optional separators, like (###) ###-####</div>
      <div className="valid-feedback">Yup, that's a phone number!</div>
    </div>
  )
}

export default PhoneFormGroup