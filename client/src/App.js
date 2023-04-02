import './App.css';
import './App.scss';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import NavBar from './components/navbar'
import Auth from './screens/Auth/auth';
import Login from './screens/Auth/Login';
import Landing from './screens/landing/Landing';
import { Container } from 'react-bootstrap';
function App() {
  return (
            <div className="App">
                <Routes>
                <Route exact path="/" element={<Landing/>} />
                    <Route exact path="login" element={<Login/>} />
                    <Route exact path="signup" element={<Auth/>} />
                </Routes>
            </div>
      
      





       



   

      

    


  );
}

export default App;
