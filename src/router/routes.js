import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from '../layouts/dashboard';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
//
import Login from '../pages/Login';
import ForgotPassword from '../pages/ForgotPassword';
import NotFound from '../pages/Page404';
import Report from '../pages/Report';
import MyReport from '../pages/MyReport';
import DashboardApp from '../pages/DashboardApp';
import Profile from '../pages/Profile';
import Settings from './../pages/Settings';
//import SalesResult from '../pages/SalesResult';
import PrivateRouter from './PrivateRouter';
import Company from '../pages/Company';
import CompanyAdd from './../pages/CompanyAdd';
import CompanyEdit from './../pages/CompanyEdit';
import User from '../pages/User';
import UserAdd from './../pages/UserAdd';
import UserEdit from './../pages/UserEdit';
import UserAccess from './../pages/UserAccess';
import CompanyCategory from './../pages/CompanyCategory';
import Clocking from './../pages/Clocking'; 
import ClockingUser from './../pages/ClockingUser';
import NewPassword from './../pages/NewPassword';
import AdvertisingPackageAdd from './../pages/AdvertisingPackageAdd';
import AdvertisingPackage from '../pages/AdvertisingPackage';
import AdvertisingPackageEdit from './../pages/AdvertisingPackageEdit';
import Advertising from '../pages/Advertising';
import AdvertisingCompany from '../pages/AdvertisingCompany';
//import SalesResultAddForm from '../sections/@dashboard/resultSales/SalesResultAddForm';

// ----------------------------------------------------------------------

export default function Router() {

  return useRoutes([
    {
      path: '/dashboard',
      element: <PrivateRouter allowedRoles={[5150,1984,1990,2001,2055]}> <DashboardLayout /> </PrivateRouter> ,
      children: [
        { path: 'app', element: <PrivateRouter allowedRoles={[5150,1984,1990,2001,2055,]}> <DashboardApp /> </PrivateRouter>  },
        { path: 'agentes', element: <PrivateRouter allowedRoles={[1984,5150]}><User /></PrivateRouter> },
        { path: 'agentes/add', element: <PrivateRouter allowedRoles={[1984,5150]}><UserAdd/></PrivateRouter> },
        { path: 'agentes/edit/:user_id', element: <PrivateRouter allowedRoles={[1984,5150]}><UserEdit /></PrivateRouter> },
        { path: 'agentes/access/:user_id', element: <PrivateRouter allowedRoles={[5150,1984,2001,2055]}><UserAccess /></PrivateRouter> },
        { path: 'clocking', element: <PrivateRouter allowedRoles={[5150,1984]}><Clocking /></PrivateRouter> },
        { path: 'clockinguser', element: <PrivateRouter allowedRoles={[2001,2055]}><ClockingUser /></PrivateRouter> },
        { path: 'parceiros', element: <PrivateRouter allowedRoles={[1984,5150,2001,1990,2055]}><Company /></PrivateRouter> },
        { path: 'parceiros/add', element: <PrivateRouter allowedRoles={[5150,1984,1990,2001,2055]}><CompanyAdd /></PrivateRouter> },
        { path: 'parceiros/edit/:company_id', element: <PrivateRouter allowedRoles={[5150,1984,1990,2001,2055]}><CompanyEdit /></PrivateRouter> },
        { path: 'parceiros/publicidade', element: <PrivateRouter allowedRoles={[5150,1984,1990,2001,2055]}><Advertising /></PrivateRouter> },
        { path: 'parceiros/publicidade/:company_id', element: <PrivateRouter allowedRoles={[5150,1984,1990,2001,2055]}><AdvertisingCompany /></PrivateRouter> },
        { path: 'categorias', element: <PrivateRouter allowedRoles={[5150,1984,1990]}><CompanyCategory /></PrivateRouter> },
        { path: 'publicidade', element: <PrivateRouter allowedRoles={[5150,1984,1990,2055]}><AdvertisingPackage /></PrivateRouter> },
        { path: 'publicidade/add', element: <PrivateRouter allowedRoles={[5150,1984,1990]}><AdvertisingPackageAdd /></PrivateRouter> },
        { path: 'publicidade/edit/:advertisingPackage_id', element: <PrivateRouter allowedRoles={[5150,1984,1990]}><AdvertisingPackageEdit /></PrivateRouter> },
        
       // { path: 'resultadovendas', element: <PrivateRouter allowedRoles={[1984,5150,2001,1990]}><SalesResult /></PrivateRouter> },
       // { path: 'resultadovendas/add', element: <PrivateRouter allowedRoles={[1984,5150,2001,1990]}><SalesResultAddForm /></PrivateRouter> },

        { path: 'relatorios', element: <PrivateRouter allowedRoles={[5150,1984,1990]}> <Report /></PrivateRouter> },
        { path: 'relatorios/meus', element: <PrivateRouter allowedRoles={[5150,1984,1990]}> <MyReport /></PrivateRouter> },
        { path: 'perfil', element: <PrivateRouter allowedRoles={[5150,1984,1990,2001,2055]}> <Profile /></PrivateRouter> },
        { path: 'definicoes', element: <PrivateRouter allowedRoles={[5150,1984,1990,2001,2055]}> <Settings /></PrivateRouter> },
      ],
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Login/> },
        { path: '/redefinirpasse', element: <ForgotPassword /> },
        { path: '/redefinirpasse/:user_id', element: <NewPassword /> },
        { path: '/dashboard/app', element: <Navigate to="/dashboard/app" /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ], 
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}

