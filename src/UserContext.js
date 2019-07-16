import React, {useState,useEffect} from 'react'
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

const UserContext = React.createContext()

export const UserProvider = (props) => {
  const [user, setUser] = useState(UnauthorizedUser)

  const login = (username) => {
    const candidateUser = findUser(username)
    setUser(candidateUser) 
  }

  useEffect(() => {
    login("nate")
  },[])

  return (
    <UserContext.Provider value={{user}}>
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