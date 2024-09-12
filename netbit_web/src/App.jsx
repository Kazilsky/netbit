import React from 'react';
import './index.css';
import Routers from './components/Router';
import { useContext } from 'react';
import { ThemeContext } from './main';

function App() {

  return (
    <Routers />
  );
}

export default App;