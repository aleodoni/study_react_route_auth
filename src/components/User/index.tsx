import React from 'react';

import { useGithub } from '../../hooks/github';

const User: React.FC = () => {
  const { user } = useGithub();

  console.log('USER');

  return (
    <div>
      <span>Dados do Usuário</span>
      <br />
      {user && (
        <>
          <span>
            ID:
            {user.id}
          </span>
          <br />
          <span>
            username:
            {user.login}
          </span>
          <br />
          <span>
            Name:
            {user.name}
          </span>
          <br />
        </>
      )}
    </div>
  );
};

export default User;
