import React, { useEffect, useState } from 'react';
import { checkSession, logoutUser, googleLoginUrl } from './api';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkSession().then((data) => {
      if (data.authenticated) {
        setUser(data.user);
      }
      setLoading(false);
    });
  }, []);

  const handleLogout = async () => {
    await logoutUser();
    setUser(null);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="App">
      <h1>Nivaran Auth Demo</h1>
      
      {user ? (
        <div className="profile">
          <img src={user.picture} alt={user.firstName} style={{ borderRadius: '50%' }} />
          <h2>Welcome, {user.firstName}!</h2>
          <p>Email: {user.email}</p>
          <p>Shopify Customer ID: {user.id}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div className="login">
          <p>Please sign in to continue.</p>
          <button onClick={() => window.location.href = googleLoginUrl}>
            Continue with Google
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
