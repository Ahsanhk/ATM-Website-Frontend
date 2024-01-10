import React, { useState, useEffect } from 'react';

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
    <div className="congrats">
      <h2 style={{ color: 'maroon', fontSize: 40 }}>
        Your transaction is successful.
      </h2>
    </div>
  );
};

export default CongratsScreen;
