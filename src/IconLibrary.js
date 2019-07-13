import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch, faRunning, faUser, faAngleLeft} from '@fortawesome/free-solid-svg-icons'

export const loadIconLibrary = () =>
  library.add(
    faSearch,
    faRunning, 
    faUser,
    faAngleLeft
  )