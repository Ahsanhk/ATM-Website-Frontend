import React, { useState, useEffect } from 'react';

const WebSocketTest = () => {
  const [ws, setWs] = useState(null);

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

    return () => {
      if (newWebSocket) {
        newWebSocket.close();
      }
    };
  }, []);

  const sendMessage = (message) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      console.log("sending message");
      ws.send(message);
    } 
    else {
      console.log('WebSocket not connected');
    }
  };

  const onStartClick = () => {
    sendMessage('start_task');
  };

  const onStopClick = () => {
    sendMessage('stop_task');
  };

  return (
    <div style={{ width: '100%',height: '100%',textAlign: 'center', marginTop: '50px', backgroundColor: 'red' }}>
      <h1>Hi</h1>
      <button style={buttonStyle} onClick={onStartClick}>Start</button>
      <button style={buttonStyle} onClick={onStopClick}>Stop</button>
    </div>
  );
};

const buttonStyle = {
  backgroundColor: '#007bff',
  color: 'white',
  padding: '10px 20px',
  margin: '10px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

export default WebSocketTest;
