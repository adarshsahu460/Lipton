import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SignUp } from './pages/admin/SignUp';
import { SignIn } from './pages/admin/SignIn';
import { Forgot } from './pages/admin/Forgot';
import { Dashboard  } from './pages/admin/Dashboard';
import { AlertBox } from './components/AlertBox';

function App() {  
  return (
      <>
        <BrowserRouter>
          <Routes>
            <Route path="/admin/signup" element={<SignUp />} />
            <Route path="/admin/signin" element={<SignIn />} />
            <Route path="/admin/forgot" element={<Forgot />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />
          </Routes>
        </BrowserRouter>

        {/* <button onClick={() => {
            AlertBox(1);
        }}>Click me</button> */}
      </>
  )
}

export default App
