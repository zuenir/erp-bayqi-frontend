// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfigUser = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  { 
    title: 'parceiros',
    path: '/dashboard/parceiros',
    icon: getIcon('bxs:business'),
  },
  {
    title: 'Sistema de Ponto',
    path: '/dashboard/clockinguser',
    icon: getIcon('icon-park-outline:check-in'),
  },
];

export default navConfigUser;
