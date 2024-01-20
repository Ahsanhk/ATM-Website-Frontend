import React, { useState, useEffect } from 'react';
import LogoutCard from './logoutCard';
import '../components/confirmScreen.css';

const CongratsScreen = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return isLoading ? (
    <div className="loader">
        <div className="ball">
            <div className="inner">
                <div className="line"></div>
                <div className="line line--two"></div>
                <div className="oval"></div>
                <div className="oval oval--two"></div>
            </div>
        </div>
        <div className="shadow"></div>
    </div>
  ) : (
    <LogoutCard>
      <div className="congratBlock">
        <h2 style={{fontSize: 32, paddingTop: 250 }}>
          Your transaction is successful.
        </h2>
      </div>
    </LogoutCard>
  );
};

export default CongratsScreen;
