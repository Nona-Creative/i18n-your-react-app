import React from 'react';

import Greeting from '../Greeting'
import LanguageSelector from '../LanguageSelector'
import './App.css';

const App = () => (
  <div className="App">
    <Greeting />
    <LanguageSelector />
  </div>
);

export default App;
