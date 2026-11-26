import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('token'));

  const login = (fakeOrRealToken = 'test-jwt-token') => {
    localStorage.setItem('token', fakeOrRealToken);
    setToken(fakeOrRealToken);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, isAuthenticated: Boolean(token), login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);