import React from 'react'

const ConditionalButton = ({valid=false,onClick,children}) => {
  if (valid) {
    return(<button className="btn btn-primary" onClick={(e) => {e.preventDefault(); onClick()}}>{children}</button>)
  } else {
    return(<button className="btn btn-outline-primary" disabled={true}>{children}</button>)
  }
}

export default ConditionalButton