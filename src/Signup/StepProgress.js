import React from 'react'

import {SectionConsumer} from './Sectioned'

const StepProgress = SectionConsumer(({stepper}) =>
  <span className="text-muted">
    {stepper.step} of {stepper.total}
  </span>
)

export default StepProgress