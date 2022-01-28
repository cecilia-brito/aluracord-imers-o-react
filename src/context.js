import React from "react";

export const context = React.createContext()
export const ContextProvider = props => {
    const [userData, setUserData] = React.useState({})
    const [userFriends, setUserFriends] = React.useState({})
    return(
      <context.Provider value={{userData, setUserData, userFriends, setUserFriends}}>{props.children}</context.Provider>
    )
  }
