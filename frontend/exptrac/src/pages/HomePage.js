import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <h1>Welcome to Expense Management App</h1>
      {user ? (
        <div>
          <p>Welcome, {user.name}</p>
          <Link to="/group">Your Groups</Link>
        </div>
      ) : (
        <div>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      )}
    </div>
  );
};

export default HomePage;
