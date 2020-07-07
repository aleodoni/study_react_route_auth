import React from 'react';
import { Link } from 'react-router-dom';

import User from '../../components/User';
import Carrega from '../../components/Carrega';
import Deleta from '../../components/Deleta';

const Github: React.FC = () => {
  return (
    <>
      <h1>Hello</h1>
      <User />
      <Carrega />
      <Deleta />
      <br />
      <Link to="/">home</Link>
      <br />
      <Link to="/escola">escola</Link>
    </>
  );
};

export default Github;
