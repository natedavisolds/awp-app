import React, {useReducer,useEffect} from 'react'
import allUsers from './Data/allUsers.json'

const UnauthorizedUser = {
  "id": "0",
  "displayName": "None",
  "loginName": "",
  "confirmedPlaytimes": {},
  "authenticated": false,
  "authorized": false
}

const findUser = (id) => {
  const candidate = allUsers[id]
  if (candidate !== undefined) {
    return Object.assign({},candidate, {
      authenticated: true,
      authorized: true
    })
  } else {
    return UnauthorizedUser
  }
}

const storedUser = (defaultUsername) => {
  const stored = window.localStorage.getItem("User") 

  if (stored) {
    return JSON.parse(stored)
  } else {
    return findUser(defaultUsername)
  }
}

const userSchema = () => {
  return {
    id: "",
    "displayName": "",
    "loginName": "",
    "confirmedPlaytimes": {},
    "authenticated": false,
    "authorized": false
  }
}

const confirmPlaytimeSchema = (additionalFields={}) => {
  const rightNow = Date.now()
  return Object.assign({
    "id": rightNow,
    "confirmedAt": rightNow,
    "playtimeId": ""
  }, additionalFields)
} 

const storeUser = (userInfo) => {
  const newUser = Object.assign({},userSchema(),userInfo)
  window.localStorage.setItem("User", JSON.stringify(newUser))
}

const UserContext = React.createContext()

const UserReducer = (state, action) => {
  switch(action.type) {
    case "LOGIN":
      return action.user
    case "UPDATE_USER":
      return Object.assign({},state,action.userInfo)
    case "PLAY_PLAYTIME":
      const confirmedPlaytimes = Object.assign({}, state.confirmedPlaytimes, {[action.confirmedPlaytime.id]: action.confirmedPlaytime})
      return Object.assign({},state, { confirmedPlaytimes })
    case "SITOUT_PLAYTIME":
      const confirmedForSitout = Object.assign({}, state.confirmedPlaytimes, {[action.confirmedPlaytime.id]: action.confirmedPlaytime})
      return Object.assign({},state, { confirmedPlaytimes:confirmedForSitout })
    case "CHANGE_PLAYTIME":
      const newPlaytimes = Object.values(state.confirmedPlaytimes)
        .filter((confirmed) => { return confirmed.playtimeId !== action.playtime.id})
        .reduce((confirmedTimes, confirmed) => Object.assign(confirmedTimes, {[confirmed.id]:confirmed}), {})

      return Object.assign({},state, { confirmedPlaytimes: newPlaytimes})
    default:
      return state
  }
}

export const UserProvider = (props) => {
  const [user, dispatch] = useReducer(UserReducer,storedUser("nate"))

  const login = (newUser) => dispatch({type: "LOGIN", user: newUser})
  const updateUser = (updateable) => dispatch({type: "UPDATE_USER", userInfo: updateable})
  const confirmPlaytime = (playtime) => dispatch(
    {
      type:"PLAY_PLAYTIME", 
      confirmedPlaytime: confirmPlaytimeSchema({"playtimeId": playtime["id"], playing: true })
    }
  )
  const sitoutPlaytime = (playtime) => dispatch(
    {
      type:"SITOUT_PLAYTIME", 
      confirmedPlaytime: confirmPlaytimeSchema({"playtimeId": playtime["id"], playing: false })
    }
  )
  const changePlaytime = (playtime) => {
    dispatch({
      type:"CHANGE_PLAYTIME",
      playtime
    })
  }
  
  useEffect(() => {storeUser(user)}, [user])

  const commands = {
    updateUser,
    login,
    confirmPlaytime,
    changePlaytime,
    sitoutPlaytime
  }

  return (
    <UserContext.Provider value={{user, commands}}>
      { props.children }
    </UserContext.Provider>
  )
}

export const UserConsumer = (Component) => {
  return props => {
    return (
      <UserContext.Consumer>
         { (contextualProps) => {
            return (
              <Component
                {...props}
                {...contextualProps}
              />
            )
          }
        }
      </UserContext.Consumer>
    )
  }
}