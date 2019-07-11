import React from 'react'
import {UserConsumer} from '../UserContext'

const ProfileContainer = ({user}) => {
  return (
    <div className="p-2">
    { user ? 
      <p className="h2">{user.displayName}</p>
      :
      <p>Unknown</p>
    }
    </div>
  )
}

export default UserConsumer(ProfileContainer)