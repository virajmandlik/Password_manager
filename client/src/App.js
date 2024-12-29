import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PasswordManager from './component/PasswordManager';
import Login from './component/Login';
import Register from './component/Register';
import LandingPage from './component/LandingPage';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<LandingPage />} />
          {/* <Route path="*" element={<LandingPage />} /> */}
          <Route path="/register" element={<Register />} />
          <Route path="/password-manager" element={<PasswordManager />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;