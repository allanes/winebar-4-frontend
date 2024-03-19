import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { OpenAPI, Token, LoginService, PersonalInterno, Body_login_backend_api_v1_login_access_token_post, ApiError } from '../../codegen_output';
import Swal from 'sweetalert2';

interface AuthContextType {
  isLoggedIn: boolean;
  user: PersonalInterno | null;
  token: Token | null;
  login: (rfid: string, target: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProvidertProps {
    children: ReactNode
}

export const AuthProvider: React.FC<AuthProvidertProps> = ({ children }) => {
  const [user, setUser] = useState<PersonalInterno | null>(null);
  const [token, setToken] = useState<Token | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const fetchPassword = async (target: string): Promise<string> => {
    const response = await fetch(`http://localhost:3001/getPassword/${target}`);
    const data = await response.json();
    return data.api_key;
  };

  const handleApiError = (error: unknown) => {
    const err = error as ApiError;
    let errorMessage = 'Ocurrió un error.';
    if (err.body && err.body.detail) {
      errorMessage = err.body.detail;
    }
    Swal.fire('Error', errorMessage, 'error');
  };

  const fetchUserDetails = async () => {
    try {
      const userDetails = await LoginService.readUsersMeBackendApiV1LoginUsersMeGet();
      setUser(userDetails);
    } catch (error) {
      console.error('Failed to fetch user details', error);
      handleApiError(error);
    }
  };

  const login = async (rfid: string, target: string) => {
    try {
      const password = await fetchPassword(target);
      const loginData: Body_login_backend_api_v1_login_access_token_post = {
        username: rfid,
        password: password,
      };
      const response = await LoginService.loginBackendApiV1LoginAccessTokenPost(loginData);
      if (response && response.access_token) {
        setToken(response);
        OpenAPI.TOKEN = response.access_token
        await fetchUserDetails();
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error('Login failed', error);
      handleApiError(error);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    OpenAPI.TOKEN = '';
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
