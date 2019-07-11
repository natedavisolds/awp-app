import React, {useState} from 'react'
import allPlaytimes from './Data/allPlaytimes'

const PlaytimeContext = React.createContext()

export const PlaytimeProvider = (props) => {
  const [playtimes] = useState(Object.values(allPlaytimes))

  return (
    <PlaytimeContext.Provider value={{playtimes, allPlaytimes}}>
      {props.children}
    </PlaytimeContext.Provider>
  );
}

export const PlaytimeConsumer = (Component) => {
  return props => {
    return (
      <PlaytimeContext.Consumer>
        { (contextualProps) => {
            return (
              <Component
                {...props}
                {...contextualProps}
              />
            )
          }
        }
      </PlaytimeContext.Consumer>
    );
  };
}

export default PlaytimeContext