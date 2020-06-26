import Login from '../components/pages/LoginUser';
import DriverRoute from '../components/pages/DriverRoute';
import UserRegisterRoute from '../components/pages/UserRegisterRoute';
import DriverRegister from '../components/pages/DriverRegister';
import UserRoute from '../components/pages/UserRoute';
import PrivacyPolicy from '../components/pages/PrivacyPolicy';
import History from '../components/pages/History';
import RouteDetails from '../components/pages/RouteDetails';

const components = {
  Login: {
    component: Login,
    url: '/',
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
};

const configRoute = {
  guest: {
    route: [components.Login, components.Register, components.PrivacyPolicy],
    redirect: '/',
  },
  user: {
    route: [
      components.DriverRegister,
      components.PrivacyPolicy,
      components.UserRoute,
      components.DriverRoute,
      components.History,
      components.RouteDetails,
    ],
    redirect: '/search-driver',
  },
};

export default configRoute;
