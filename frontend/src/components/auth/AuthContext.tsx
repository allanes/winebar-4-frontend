import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { OpenAPI, Token, LoginService, PersonalInterno, Body_login_backend_api_v1_login_access_token_post, ApiError } from '../../codegen_output';
import Swal from 'sweetalert2';

interface AuthContextType {
  isLoggedIn: boolean;
  user: PersonalInterno | null;
  token: Token | null;
  login: (rfid: string) => Promise<void>;
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

  const fetchPassword = async (): Promise<string> => {
    const response = await fetch(`http://localhost:3001/getPassword`);
    const data = await response.json();
    return data.api_key;
  };

  const fetchUserDetails = async () => {
    try {
      const userDetails = await LoginService.readUsersMeBackendApiV1LoginUsersMeGet();
      setUser(userDetails);
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Failed to fetch user details', error);
      setIsLoggedIn(false);
      setToken(null);
      OpenAPI.TOKEN = '';
      localStorage.removeItem('token');
    }
  };

  const login = async (rfid: string) => {
    try {
      const password = await fetchPassword();
      const loginData: Body_login_backend_api_v1_login_access_token_post = {
        username: rfid,
        password: password,
      };
      const response = await LoginService.loginBackendApiV1LoginAccessTokenPost(loginData);
      if (response && response.access_token) {
        setToken(response);
        OpenAPI.TOKEN = response.access_token;
        localStorage.setItem('token', response.access_token);
        await fetchUserDetails();
      }
    } catch (error) {
      console.error('Login failed', error);
      const err = error as ApiError;
      let errorMessage = 'No se pudo validar las credenciales.';
      if (err.body && err.body.detail) {
        errorMessage = err.body.detail;
      }
      Swal.fire('Error', errorMessage, 'error');
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    OpenAPI.TOKEN = '';
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken({ access_token: storedToken, token_type: 'bearer' });
      OpenAPI.TOKEN = storedToken;
      fetchUserDetails();
    }
  }, []);

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
