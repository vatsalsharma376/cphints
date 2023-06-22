import "./App.css";
import "./App.scss";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import NavBar from "./components/Navbar";
import Auth from "./screens/Auth/auth";
import Login from "./screens/Auth/Login";
import Landing from "./screens/landing/Landing";
import Contribute from "./screens/Contribute/Contribute";
import ReviewRoute from "./screens/Review/ReviewRoute";
import Problems from "./screens/Problems/Problems";
import Profile from "./screens/Profile/Profile";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="login" element={<Login />} />
        <Route exact path="signup" element={<Auth />} />
        <Route exact path="contribute" element={<Contribute />} />
        <Route exact path="problems" element={<Problems />} />
        <Route exact path="profile" element={<Profile />} />
        <Route exact path="review" element={<ReviewRoute />} />
      </Routes>
    </div>
  );
}

export default App;
