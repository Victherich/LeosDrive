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
import UserEmailVerification from './components/UserEmailVerification';
import UserResendEmailOTP from './components/UserResendEmailOtp';
import AdminSignUp from './components/AdminSignUp';
import AdminEmailVerification from './components/AdminEmailVerification';
import AdminResendEmailOTP from './components/AdminResendEmailOTP';
import AdminLogin from './components/AdminLogin';
import AdminForgotPassword from './components/AdminForgotPassword';
import AdminResetPassword from './components/AdminResetPassword';
import PrivateAdminDashboard from './components/PrivateAdminDashboard';
import AdminDashboard from './components/AdminDashboard';
import BackArrow from './components/BackArrow';
import UserProfile from './components/UserProfile';
import UserRides from './components/UserRides';
import DriverEmailVerification from './components/DriverEmailVerification';
import DriverResendEmailOTP from './components/DriverResendEmailOTP';
import DriverProfile from './components/DriverProfile';
import TermsAndPrivacy from './components/TermsAndConditions';
import FooterComponent from './components/Footer';
import HeaderComponent from './components/Header';
import ContactUs from './components/ContactcUs';
import ScrollToTop from './components/ScrollToTop';
import DeliveryForm from './components/DeliveryForm';
import DriverAcceptedRides from './components/DriverAcceptedRides';
import DriverCompletedRides from './components/DriverCompletedRides';
import MyDeliveryBookings from './components/MyDeliveryBookings';
import DeliveryDetails from './components/DeliveryDetail';
import DriverCompletedRides2 from './components/DriverCompletedRides2';
import AdminDeliveryDetail from './components/AdminDeliveryDetail';
import FoodDeliveryForm from './components/FoodBookingForm';
import UserFoodDeliveries from './components/UserFoodDeliveries';
import AboutUs from './components/AboutUs';


function App() {
  return (
    <BrowserRouter>
    <ScrollToTop/>
    <HeaderComponent/>
    <BackArrow/>
        <Routes>
            <Route path='/' element={<LandingPage/>}/>
            <Route path='/splash' element={<SplashScreen/>}/>
            <Route path='/useronboarding' element={<UserOnboarding/>}/>
            <Route path='/userforgotpassword' element={<UserForgotPassword/>}/>
            <Route path='/userresetpassword/:token' element={<UserResetPassword/>}/>
            <Route path='/driveronboarding' element={<DriverOnboarding/>}/>
            <Route path='/driverforgotpassword' element={<DriverForgotPassword/>}/>
            <Route path='/driverresetpassword/:token' element={<DriverResetPassword/>}/>
            <Route path='/driveremailVerification' element={<DriverEmailVerification/>}/>
            <Route path='/driverresendemailotp' element={<DriverResendEmailOTP/>}/>
            <Route path='/useremailverification' element={<UserEmailVerification/>}/>
            <Route path='/userresendemailotp' element={<UserResendEmailOTP/>}/>
            <Route path='/aboutus' element={<AboutUs/>}/>

            <Route path='/termsandconditions' element={<TermsAndPrivacy/>}/>
            <Route path='/contactus' element = {<ContactUs/>}/>


            <Route path='/userdashboard/deliveryform/:user_id' element={<DeliveryForm/>}/>
            <Route path='/userdashboard/mydeliverybookings/:user_id' element={<MyDeliveryBookings/>}/>
            <Route path='/userdashboard/mydelivery/:id' element={<DeliveryDetails/>}/>
            <Route path='/userdashboard/userfooddeliveries/:user_id' element={<UserFoodDeliveries/>}/>





            


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





            {/* admin */}
            {/* <Route path='/adminsignup' element={<AdminSignUp/>}/> */}
            <Route path='/adminemailverification' element={<AdminEmailVerification/>}/>
            <Route path='/adminresendemailotp' element={<AdminResendEmailOTP/>}/>
            <Route path="/adminlogin" element={<AdminLogin/>}/>
            <Route path='/adminforgotpassword' element={<AdminForgotPassword/>}/>
            <Route path='/adminresetpassword/:token' element={<AdminResetPassword/>}/>
            <Route path='/admindashboard' element={<PrivateAdminDashboard/>}>
                <Route path ='' element={<AdminDashboard/>}/>
            </Route>

            <Route path='/deliverydetail/:id' element={<AdminDeliveryDetail/>}/>
            <Route path='userdashboard/foodform/:user_id' element={<FoodDeliveryForm/>}/>
 

            {/* user */}
            <Route path="/userdashboard/userprofile/:id" element={<UserProfile />} />
                            <Route path="/userdashboard/userrides" element={<UserRides />} />

                            <Route path="/driverdashboard/driverprofile/:id" element={<DriverProfile/>}/>
            {/* <Route path='/userdashboard/foodform/:user_id' element={<} */}


            <Route path='/driverdashboard/acceptedRide/:driverId' element={<DriverAcceptedRides/> }/>
            <Route path='/driverdashboard/completedRides/:driverId' element={<DriverCompletedRides/>}/>
            <Route path='/driverdashboard/completedRides2/:driverId' element={<DriverCompletedRides2/>}/>
        </Routes>
        <FooterComponent/>
    </BrowserRouter>
  );
}

export default App;
