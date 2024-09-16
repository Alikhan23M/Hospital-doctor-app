import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DoctorHome from './Components/DoctorHme';
import DoctorLogin from './Components/DoctorLogin';
import DoctorSignup from './Components/DoctorSignup';
import Alert from './Components/Alert';
import { useState } from 'react';
function App() {
  const [alert, setAlert] = useState(null)

  const showAlert = (message, type) => {
    setAlert({
      message: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  }
  return (
  <>
  <>
      <div>
        <BrowserRouter>
        <Alert alert={alert}/>
        <Routes>
            <Route exact path="/" element={<DoctorHome showAlert={showAlert}/>} />
          </Routes>
          <Routes>
            <Route exact path="/doctor-signup" element={<DoctorSignup showAlert={showAlert}/>} />
          </Routes> 
          <Routes>
            <Route exact path="/doctor-login" element={<DoctorLogin showAlert={showAlert}/>} />
          </Routes>         
        </BrowserRouter>
      </div>
    </>
  </>
  );
}

export default App;
