import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SignUp as AdminSignUp } from './pages/admin/SignUp';
import { SignIn as AdminSignIn } from './pages/admin/SignIn';
import { Forgot as AdminForgot } from './pages/admin/Forgot';
import  Dashboard  from './pages/admin/Dashboard.jsx';
import { AlertBox } from './components/AlertBox';
import Home  from './pages/Home.jsx';


import { SignUp as UserSignUp } from './pages/user/SignUp';
import { SignIn as UserSignIn } from './pages/user/SignIn';
import { Forgot as UserForgot } from './pages/user/Forgot';
import  Console  from './pages/user/Console.jsx';

function App() {  
  return (
      <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}
            <Route path="/admin/signup" element={<AdminSignUp />} />
            <Route path="/admin/signin" element={<AdminSignIn />} />
            <Route path="/admin/forgot" element={<AdminForgot />} />
            <Route path="/admin/dashboard/*" element={<Dashboard />} />

            <Route path="/user/signup" element={<UserSignUp />} />
            <Route path="/user/signin" element={<UserSignIn />} />
            <Route path="/user/forgot" element={<UserForgot />} />
            <Route path="/user/dashboard/*" element={<Console />} />
          </Routes>
        </BrowserRouter>

        {/* <button onClick={() => {
            AlertBox(1);
        }}>Click me</button> */}
      </>
  )
}

export default App
