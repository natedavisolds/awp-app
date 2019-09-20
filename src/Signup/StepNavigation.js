import React from 'react'
import ConditionalButton from './ConditionalButton'
import StepProgress from './StepProgress'

const PreviousCol = ({onClick}) =>
  <a href="#" className="btn btn-outline-secondary mr-2" onClick={(e) => { e.preventDefault(); onClick()}}>Previous</a>

const NextCol = ({valid, onClick}) =>
  <ConditionalButton valid={valid} onClick={() => valid ? onClick() : false }>Next</ConditionalButton>

const StepNavigation = ({valid, next, previous}) =>
  <div className="row align-items-center">
    <div className="col">
    { previous && <PreviousCol onClick={previous} /> }
    { next && <NextCol valid={valid} onClick={next} /> }
    </div>
    <div className="col-3 text-right mr-3">
      <StepProgress />
    </div>
  </div>

export default StepNavigation