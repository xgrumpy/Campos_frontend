import { Routes, Route } from 'react-router-dom'
import './App.css';
import Home from './pages/Home';
import Login from './pages/Auth/login';
import Register from './pages/Auth/register';
import Dashboard from './pages/Auth/dashboard';
import New from './pages/dashboard/admin/user/new';
import Events from './pages/dashboard/admin/events/events';
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
        <Route path='/dashboard/user/new' element={<New />} />
        <Route path='/dashboard/events/list' element={<Events />} />
      </Routes>
    </Provider>
  )
}

export default App;
