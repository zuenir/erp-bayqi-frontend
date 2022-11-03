// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfigAdvertising = [ 
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    title: 'Sistema de Ponto',
    path: '/dashboard/clockinguser',
    icon: getIcon('icon-park-outline:check-in'),
  },
  {
    title: 'parceiros',
    icon: getIcon('bxs:business'),
    children: [
      {
        id: '1',
        title: 'Todos',
        path: '/dashboard/parceiros',
      },
    ],
  },
  {
    title: 'publicidade',
    icon: getIcon('icons8:advertising'),
    children:[
      {
        id: '1',
        title: 'BayQi Publicidade',
        path: '/dashboard/parceiros/publicidade',
      }, 
      {
        id: '2',
        title: 'Pacote Publicitários',
        path: '/dashboard/publicidade',
      },
     /* {
        id: '3',
        title: 'Resultado de Vendas',
        path: '/dashboard/resultadovendas',
      },*/
    ]
  },
];
 
export default navConfigAdvertising;