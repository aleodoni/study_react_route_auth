import React, { useCallback } from 'react';

import { useAuth } from '../../hooks/auth';

const Loga: React.FC = () => {
  const { user, token, signOut } = useAuth();

  const handleLogout = useCallback(() => {
    signOut();
  }, [signOut]);

  return (
    <>
      {user && <button onClick={handleLogout}>Deslogar</button>}
      <br />
      <span>
        Usuário:
        {user?.name}
      </span>
      <br />
      <span>
        Token:
        {token}
      </span>
    </>
  );
};

export default Loga;
