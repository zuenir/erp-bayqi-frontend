// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    title: 'agente comercial',
    path: '/dashboard/agentes',
    icon: getIcon('eva:people-fill'),
  },
  {
    title: 'Sistema de Ponto',
    path: '/dashboard/clocking',
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
      {
        id:'2',
        title: 'Categorias',
        path: '/dashboard/categorias',
      }
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
  {
    title: 'relatórios',
    icon: getIcon('eva:file-text-fill'),
    children: [
      {
        id: '1',
        title: 'Gerar Relatórios',
        path: '/dashboard/relatorios',
      },
      {
        id: '2',
        title: 'Meus Relatórios',
        path: '/dashboard/relatorios/meus',
      },
    ],
  },
];
 
export default navConfig;