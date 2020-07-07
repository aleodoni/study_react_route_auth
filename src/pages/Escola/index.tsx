import React from 'react';
import { Link } from 'react-router-dom';

import Loga from '../../components/Loga';

const Escola: React.FC = () => {
  return (
    <>
      <h1>Escola</h1>
      <Loga />
      <br />
      <Link to="/">home</Link>
      <br />
      <Link to="/github">github</Link>
    </>
  );
};

export default Escola;
