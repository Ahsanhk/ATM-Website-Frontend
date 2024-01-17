import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const WebSocketContext = createContext();

export const WebSocketProvider = ({ children }) => {
    const [ws, setWs] = useState(null);
    const [videoUrl, setVideoUrl] = useState('');
    const [fistRecognized, setFistRecognized] = useState(false);
  
    const navigate = useNavigate();

    useEffect(() => {
      const newWebSocket = new WebSocket('ws://localhost:8001/ws');
  
      newWebSocket.onopen = () => {
        console.log('WebSocket connected');
        setWs(newWebSocket);
      };
  
      newWebSocket.onclose = () => {
        console.log('WebSocket disconnected');
        setWs(null);
      };
  
      newWebSocket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === 'video_url') {
          const url = data.data.url;
          setVideoUrl(url);
          console.log('Received video URL:', url);
        } else if (data.type === 'fist_recognized') {
          const recognized = data.data.recognized;
          console.log('Fist recognized:', recognized);
          setFistRecognized(recognized);
        }
      };
  
      return () => {
        if (newWebSocket) {
          newWebSocket.close();
        }
      };
    }, []);
  
    const sendMessage = (message) => {
      if (ws && ws.readyState === WebSocket.OPEN) {
        console.log('Sending message');
        ws.send(message);
      } else {
        console.log('WebSocket not connected');
      }
    };
  
    const onStartClick = (cardId) => {
      sendMessage(`start_task ${cardId}`);
    };
  
    const onStopClick = () => {
      sendMessage('stop_task');
    };

    // const logout = async () => {
    //   navigate('/');
    // }
  return (
    <WebSocketContext.Provider value={{ onStartClick, onStopClick, videoUrl, fistRecognized, }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  return useContext(WebSocketContext);
};
