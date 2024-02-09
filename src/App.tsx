import { Routes, Route } from 'react-router-dom'
import './App.css';
import Home from './pages/Home';
import Login from './pages/Auth/login';
import Register from './pages/Auth/register';
import Dashboard from './pages/Auth/dashboard';
import { Provider } from 'react-redux';
import { store } from "./store";

function App() {

  return (
    <Provider store={store} >
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard' element={<Dashboard />} />

      </Routes>
    </Provider>
  )
}

export default App;
