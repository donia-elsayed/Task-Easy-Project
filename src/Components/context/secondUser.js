import { createContext, useState } from "react";

export const SecondUserContext = createContext();
const SecondUserProvider = ({ children }) => {
  const [secondUserData, setSecondUserData] = useState();
  return (
    <SecondUserContext.Provider value={{ secondUserData, setSecondUserData }}>
      {children}
    </SecondUserContext.Provider>
  );
};

export default SecondUserProvider;
