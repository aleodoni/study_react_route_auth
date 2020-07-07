import React, { useCallback } from 'react';

import { useGithub } from '../../hooks/github';

const Carrega: React.FC = () => {
  const { user, carrega } = useGithub();

  const handleCarrega = useCallback(() => {
    carrega();
  }, [carrega]);

  return <>{!user && <button onClick={handleCarrega}>CARREGAR</button>}</>;
};

export default Carrega;
