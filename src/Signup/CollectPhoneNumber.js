import React, {useEffect,useState} from 'react'
import {isPresent} from './Validations'

const CollectPhoneNumber = ({phoneNumber,onChange,onValidating,name="phone",placeholder="",errorStatus}) => 
    <input 
      type="phone" 
      value={phoneNumber} 
      onChange={(e) => {e.preventDefault(); onChange(e.target.value)}} 
      onBlur={() => (onValidating && onValidating()) }
      name={name} 
      className={`form-control ${errorStatus === true ? 'is-invalid' : ''} ${errorStatus === false ? 'is-valid' : ''}`} 
      aria-label={placeholder} 
    />
  

export default CollectPhoneNumber