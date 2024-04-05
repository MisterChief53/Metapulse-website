'use client';

import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
} from 'react';

type UserType = {
  name: string;
  money: number;
};

interface ContextProps {
  tokenS: string;
  userData: UserType[];
  setUserData: Dispatch<SetStateAction<UserType[]>>;
}

const UserContext = createContext<ContextProps>({
  tokenS: '',
  userData: [],
  setUserData: (): UserType[] => [],
});

export const UserContextProvider = ({ children }) => {
  const [userData, setUserData] = useState<[] | UserType[]>([]);
  const [tokenS, setTokenS] = useState('');

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem('token');
      setTokenS(token);
      //   console.log('Token obtenido en nav:', token);

      if (token) {
        try {
          if (token) {
            const response = await fetch(
              'http://localhost:8080/auth/userInfo',
              {
                headers: {
                  Authorization: token,
                },
              }
            );

            if (response.ok) {
              const data = await response.json();
              setUserData(data);
            }
          }
        } catch (error) {
          console.error('Error al obtener datos del usuario:', error);
        }
      }
    };

    fetchUserInfo(); //Se pasa como parametrp
  }, []);

  return (
    <UserContext.Provider value={{ userData, setUserData, tokenS }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
