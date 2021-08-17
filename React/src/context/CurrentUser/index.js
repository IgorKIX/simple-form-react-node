import React, { useState } from "react";

export const CurrentUserContext = React.createContext();

export const CurrentUserProvider = (props) => {
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <CurrentUserContext.Provider value={[currentUser, setCurrentUser]}>
      {props.children}
    </CurrentUserContext.Provider>
  );
};
