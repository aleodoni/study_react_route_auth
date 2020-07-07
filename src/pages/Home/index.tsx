import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '../../hooks/auth';

const Home: React.FC = () => {
  const { signIn } = useAuth();

  const handleLoga = useCallback(() => {
    signIn({ email: 'aleodoni@gmail.com', password: '123456' });
  }, [signIn]);

  return (
    <span>
      <h1>Home</h1>
      <br />
      <Link to="/github">github</Link>
      <br />
      <Link to="/escola">escola</Link>
      <br />
      <button onClick={handleLoga}>Logar</button>
    </span>
  );
};

export default Home;
