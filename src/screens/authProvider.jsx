import React, { createContext, useState, useEffect, useContext } from "react";
import axios from 'axios';
// import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify/dist/react-toastify';
import { useNavigate } from "react-router-dom";
import { useWebSocket } from "../components/webSocketContext";

export const AuthContext = createContext();

export const AuthProvider = ({ children, }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [userID, setUserID] = useState(null);
  const [userData, setUserData] = useState(null);
  const [cardData, setCardData] = useState(null);
  const [shouldLogout, setShouldLogout] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [stopChecking, setStopChecking] = useState(false);
  const { fistRecognized } = useWebSocket();

  const navigate = useNavigate();


  const showToastError = () => {
    toast.error('more than one people detected in the booth!', {
      position: toast.POSITION.TOP_CENTER 
    });
  };

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    console.log('Logging out...');
    navigate('/');
  };



  const fetchUserData = async (user_id) => {
    try{
      console.log("userid in context", user_id);
      const response = await axios.get(`http://localhost:8001/get-user-data/${user_id}`);
      // console.log(response.data);
      setUserData(response.data);
    }
    catch(error){
      console.error("error fetching user data: ", error);
    }
  }

  const fetchCardData = async (cardNumber) => {
    try{
      const response = await axios.get(`http://localhost:8001/get-card-details/${cardNumber}`);
      // console.log("card Data: ", response.data);
      setCardData(response.data);
    }
    catch(error){
      console.error("error fetching user data: ", error);
    }
  }

  // useEffect(() => {
  //   isLoggedIn();
  // }, []);

  // useEffect(() => {
  //   if (shouldLogout) {
  //     logout(); 
  //   }
  // }, [shouldLogout]);

  return (
    <AuthContext.Provider
      value={{ 
        login, 
        logout, 
        isLoggedIn ,
        isLoading, 
        userToken, 
        userID, 
        setStopChecking,
        fetchUserData, 
        userData, 
        fetchCardData, 
        cardData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
