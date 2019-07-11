import React, {useState,useEffect} from 'react'
import Users from './Data/Users'

const findUser = (id) => {
  return Users[id]
}

const UserContext = React.createContext()

export const UserProvider = (props) => {
  const [user, setUser] = useState({})

  useEffect(() => {
    setUser(findUser("1"))
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