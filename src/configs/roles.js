import DriverRoute from '../components/pages/DriverRoute';
import UserRegisterRoute from '../components/pages/UserRegisterRoute';
import Login from '../components/pages/LoginUser';
import DriverRegister from '../components/pages/DriverRegister';
import UserRoute from '../components/pages/UserRoute';
import PrivacyPolicy from '../components/pages/PrivacyPolicy';

const components = {
  Login: {
    component: Login,
    url: '/',
  },
  Register: {
    component: UserRegisterRoute,
    url: '/register'
  },
  DriverRegister: {
    component: DriverRegister,
    url: '/driver/register'
  },
  PrivacyPolicy: {
    component: PrivacyPolicy,
    url: '/privacy-policy'
  },
  UserRoute: {
    component: UserRoute,
    url: '/search-driver'
  },
  DriverRoute: {
    component: DriverRoute,
    url: '/driver/route'
  }
}

const configRoute = {
  guest: {
    route: [
      components.Login,
      components.Register,
      components.PrivacyPolicy,
    ],
    redirect: '/'
  },
  user: {
    route: [
      components.DriverRegister,
      components.PrivacyPolicy,
      components.UserRoute,
      components.DriverRoute,
    ],
    redirect: '/search-driver'
  }
}

export default configRoute;