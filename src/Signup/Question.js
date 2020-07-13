import React, {useEffect,useState} from 'react'

import {isPresent} from './Validations'

const defaultValidator = (candidate) => isPresent(candidate)

const Question = (props) => {
  const {
    defaultValue=undefined,
    dataKey,
    label,
    name,
    invalidFeedback,
    validFeedback,
    update,
    defaultErrorState=undefined,
    validator=defaultValidator
    } = props

  const [validating, setValidating] = useState((defaultErrorState !== undefined))
  const [errorState, setErrorState] = useState()
  const [valid, setValid] = useState()
  const [value, setValue] = useState(props.defaultValue)

  const onChange = (e) => setValue(e.target.value)

  useEffect(() =>
    ((update) ? update({[dataKey]:value}) : undefined),
    [value])

  useEffect(() => setValid(validator(value)), [value])

  useEffect(() => (
    (validating) ?
      setErrorState(validator(value)) :
      setErrorState(undefined)
  ), [valid,validating])

  useEffect(() => (defaultErrorState !== undefined ? setErrorState(defaultErrorState) : setErrorState(undefined) ),[])

  return(
    <div className="form-group">
      <label htmlFor="signupLastName">{label}</label>
      <input type="text"
        value={value}
        onChange={onChange}
        name={name}
        onBlur={() => setValidating(true)}
        className={`form-control ${errorState === false && 'is-invalid'} ${errorState === true &&  'is-valid'}`}
        aria-label={label}></input>
      <div className="invalid-feedback">{invalidFeedback}</div>
      <div className="valid-feedback">{validFeedback}</div>
    </div>
  )
}

export default Question
