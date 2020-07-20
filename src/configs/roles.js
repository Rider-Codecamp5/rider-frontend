import Login from '../components/pages/LoginUser';
import DriverRoute from '../components/pages/DriverRoute';
import UserRegisterRoute from '../components/pages/UserRegisterRoute';
import DriverRegister from '../components/pages/DriverRegister';
import UserRoute from '../components/pages/UserRoute';
import PrivacyPolicy from '../components/pages/PrivacyPolicy';
import History from '../components/pages/History';
import Settings from '../components/pages/Settings';
import Profile from '../components/pages/Profile';
import RouteDetails from '../components/pages/RouteDetails';
import Payment from '../components/pages/Payment';
import PaymentResult from '../components/pages/PaymentResult';
import Trip from '../components/pages/Trip';
import LandingPage from '../components/pages/LandingPage';

const components = {
  LandingPage: {
    component: LandingPage,
    url: '/',
  },
  Login: {
    component: Login,
    url: '/login',
  },
  Register: {
    component: UserRegisterRoute,
    url: '/register',
  },
  DriverRegister: {
    component: DriverRegister,
    url: '/driver/register',
  },
  PrivacyPolicy: {
    component: PrivacyPolicy,
    url: '/privacy-policy',
  },
  UserRoute: {
    component: UserRoute,
    url: '/search-driver',
  },
  DriverRoute: {
    component: DriverRoute,
    url: '/driver/route',
  },
  History: {
    component: History,
    url: '/history',
  },
  RouteDetails: {
    component: RouteDetails,
    url: '/driver/route-details/:id',
  },
  Settings: {
    component: Settings,
    url: '/settings',
  },
  Profile: {
    component: Profile,
    url: '/profile',
  },
  Payment: {
    component: Payment,
    url: '/payment/:id',
  },
  PaymentResult: {
    component: PaymentResult,
    url: '/payment-result/:id',
  },
  Trip: {
    component: Trip,
    url: '/trip/on-going',
  },
};

const configRoute = {
  guest: {
    route: [
      components.Login,
      components.Register,
      components.PrivacyPolicy,
      components.LandingPage,
    ],
    redirect: '/',
  },
  user: {
    route: [
      components.PrivacyPolicy,
      components.UserRoute,
      components.History,
      components.RouteDetails,
      components.DriverRegister,
      components.Settings,
      components.Profile,
      components.Payment,
      components.PaymentResult,
      components.Trip,
    ],
    redirect: '/search-driver',
  },
  driver: {
    route: [
      components.PrivacyPolicy,
      components.UserRoute,
      components.DriverRoute,
      components.History,
      components.Settings,
      components.Profile,
      components.RouteDetails,
      components.Payment,
      components.PaymentResult,
      components.Trip,
    ],
    redirect: '/search-driver',
  },
};

export default configRoute;
