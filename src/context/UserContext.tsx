import { createContext, useContext, useEffect, useState } from 'react';

export interface User {
  id: string;
  email?: string;
  phone?: string;
  name?: string;
  image?: string;
  provider?: 'google' | 'email' | 'x' | 'phone';
  createdAt?: string;
}

interface UserContextType {
  user: User | null;
  setUser: any;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (userData: User) => void;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  signinModal: boolean;
  setSigninModal: any
  onboarding: boolean;
  setOnboarding: any
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: any }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  // components states
  const [signinModal,setSigninModal] = useState<boolean>(false)
  const [onboarding, setOnboarding] = useState<boolean>(false)

  useEffect(() => {
    try {
      
    } catch (error) {
      
    }
     const user =  localStorage.getItem('user')
     console.log(user);
     if(user){
      setUser(JSON.parse(user))
     }
     
  },[])


  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    if (isMounted) {
      try {
        localStorage.removeItem('user');
      } catch (error) {
        console.error('Error removing from localStorage:', error);
      }
    }
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...userData });
    }
  };

  const value: UserContextType = {
    user,
    setUser,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
    updateUser,
    signinModal,setSigninModal,
    onboarding, setOnboarding
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}

