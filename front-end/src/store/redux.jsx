import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Create a Context for user data
const AuthContext = createContext();

// Create a Provider component
export const AuthProvider = ({ children }) => {
  const [accountUser, setAccountUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [tokenUser, setTokenUser] = useState(null);

  useEffect(() => {
    loadUser();
  }, []);

  // Function to load user data, including the token and ID
  const loadUser = async () => {
    try {
      const accountUser = await AsyncStorage.getItem("userAccount");
      const userId = await AsyncStorage.getItem("id");
      const token = await AsyncStorage.getItem("tokenUser"); // Load token from AsyncStorage
      if (accountUser && userId && token) {
        setAccountUser(JSON.parse(accountUser));
        setUserId(userId);
        setTokenUser(token); // Set token state
      }
    } catch (error) {
      console.error("Failed to load user data from AsyncStorage:", error);
    }
  };
  // Function to set user data, used for login and registration
  const setUser = async (userData) => {
    try {
      if (userData.accountUser) {
        await AsyncStorage.setItem("userAccount", JSON.stringify(userData.accountUser));
      }

      if (userData.accountUser?.id) {
        await AsyncStorage.setItem("id", userData.accountUser.id.toString());
      }

      if (userData.tokenUser) {
        await AsyncStorage.setItem("tokenUser", userData.tokenUser); 
        setTokenUser(userData.tokenUser); 
      }

     
      setAccountUser(userData.accountUser);
      setUserId(userData.accountUser.id);
    } catch (error) {
      console.error("Failed to set user data in AsyncStorage:", error);
    }
  };

  const login = async (userData) => {
    await setUser(userData);
  };

  const register = async (userData) => {
    await setUser(userData);
  };

  const logout = async () => {
    try {
      setAccountUser(null);
      setUserId(null);
      setTokenUser(null);
      await AsyncStorage.clear();
    } catch (error) {
      console.error("Failed to clear user data in AsyncStorage:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        accountUser,
        userId,
        tokenUser, 
        login,
        register,
        logout,
        setUser,
        loadUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
