import React from 'react';
import Signup from './Signup';
import Login from './Login';
import Home from './Home';
import Dash from './Dash';
import {BrowserRouter,Routes,Route} from 'react-router-dom';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/register' element={<Signup/>}></Route>
          <Route path='/' element={<Login/>} ></Route>
          <Route path='/home' element={<Home/>} ></Route>
          <Route path='/dash' element={<Dash/>} ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;


