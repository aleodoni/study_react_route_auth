import React, { useCallback } from 'react';

import { useGithub } from '../../hooks/github';

const Deleta: React.FC = () => {
  const { deleta, user } = useGithub();

  const handleDeleta = useCallback(() => {
    deleta();
  }, [deleta]);

  return <>{user && <button onClick={handleDeleta}>DELETAR</button>}</>;
};

export default Deleta;
