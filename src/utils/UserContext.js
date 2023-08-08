import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export function useUser() {
  const context = useContext(UserContext);
  return context || { user: null };
}

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
