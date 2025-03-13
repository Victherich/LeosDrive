import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import LandingPage from './components/LandingPage';
import SplashScreen from './components/SplashScreen';
import UserOnboarding from './components/UserOnboarding';
import PrivateUserDashboard from './components/PrivateUserDashboard';
import UserDashboard from './components/UserDashboard';
import UserLogin from './components/UserLogin';
import PrivateUserLogin from './components/PrivateUserLogin';
import UserSignUp from './components/UserSignup';
import PrivateUserSignup from './components/PrivateUserSignup';
import UserForgotPassword from './components/UserForgotPassword';
import UserResetPassword from './components/UserResetPassword';
import DriverOnboarding from './components/DriverOnboarding';
import PrivateDriverDashboard from './components/PrivateDriverDashboard';
import DriverDashboard from './components/DriverDashboard';
import PrivateDriverLogin from './components/PrivateDriverLogin';
import DriverLogin from './components/DriverLogin';
import PrivateDriverSignup from './components/PrivateDriverSignup';
import DriverSignUp from './components/DriverSignup';
import DriverForgotPassword from './components/DriverForgotPassword';
import DriverResetPassword from './components/DriverResetPassword';

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<SplashScreen/>}/>
            <Route path='/useronboarding' element={<UserOnboarding/>}/>
            <Route path='/userforgotpassword' element={<UserForgotPassword/>}/>
            <Route path='/userresetpassword/:token' element={<UserResetPassword/>}/>
            <Route path='/driveronboarding' element={<DriverOnboarding/>}/>
            <Route path='/driverforgotpassword' element={<DriverForgotPassword/>}/>
            <Route path='/driverresetpassword/:token' element={<DriverResetPassword/>}/>
            


            {/* Private paths */}
            <Route path='/userdashboard' element={<PrivateUserDashboard/>}>
                <Route path='' element={<UserDashboard/>}/>
            </Route>

            <Route path='/userlogin' element={<PrivateUserLogin/>}>
                <Route path='' element={<UserLogin/>}/>
            </Route>

            <Route path='/usersignup' element={<PrivateUserSignup/>}>
                <Route path='' element={<UserSignUp/>}/>
            </Route>

              {/* Private paths */}
              <Route path='/driverdashboard' element={<PrivateDriverDashboard/>}>
                <Route path='' element={<DriverDashboard/>}/>
            </Route>

            <Route path='/driverlogin' element={<PrivateDriverLogin/>}>
                <Route path='' element={<DriverLogin/>}/>
            </Route>

            <Route path='/driversignup' element={<PrivateDriverSignup/>}>
                <Route path='' element={<DriverSignUp/>}/>
            </Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
