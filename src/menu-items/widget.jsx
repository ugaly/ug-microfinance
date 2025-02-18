// // third-party
// import { FormattedMessage } from 'react-intl';

// // assets
// import LineChartOutlined from '@ant-design/icons/LineChartOutlined';
// import IdcardOutlined from '@ant-design/icons/IdcardOutlined';
// import DatabaseOutlined from '@ant-design/icons/DatabaseOutlined';

// // type

// // icons
// const icons = { LineChartOutlined, IdcardOutlined, DatabaseOutlined };

// // ==============================|| MENU ITEMS - DASHBOARD ||============================== //

// const widget = {
//   id: 'group-widget',
//   title: <FormattedMessage id="widgets" />,
//   icon: icons.IdcardOutlined,
//   type: 'group',
//   children: [
//     {
//       id: 'statistics',
//       title: <FormattedMessage id="statistics" />,
//       type: 'item',
//       url: '/widget/statistics',
//       icon: icons.IdcardOutlined
//     },
//     {
//       id: 'data',
//       title: <FormattedMessage id="data" />,
//       type: 'item',
//       url: '/widget/data',
//       icon: icons.DatabaseOutlined
//     },
//     {
//       id: 'chart',
//       title: <FormattedMessage id="chart" />,
//       type: 'item',
//       url: '/widget/chart',
//       icon: icons.LineChartOutlined
//     },
//     {
//           id: 'customer',
//           title: <FormattedMessage id="customer" />,
//           type: 'collapse',
//           icon: icons.CustomerServiceOutlined,
//           children: [
//             {
//               id: 'customer-list',
//               title: <FormattedMessage id="list" />,
//               type: 'item',
//               url: '/apps/customer/customer-list',
//             },
//             {
//               id: 'customer-card',
//               title: <FormattedMessage id="cards" />,
//               type: 'item',
//               url: '/apps/customer/customer-card'
//             }
//           ]
//         },
//   ]
// };

// export default widget;



// Third-party
import { FormattedMessage } from 'react-intl';

// Icons
import {
  LineChartOutlined,
  IdcardOutlined,
  DatabaseOutlined,
  CustomerServiceOutlined
} from '@ant-design/icons';

// Default Icon (Can be updated dynamically later)
const defaultIcon = IdcardOutlined;

// Function to get routes from sessionStorage
const getSessionRouters = () => {
  const storedRouters = sessionStorage.getItem('routers');
  return storedRouters ? JSON.parse(storedRouters) : [];
};

// Function to transform session routes to menu items
const generateMenu = () => {
  const routers = getSessionRouters();

  return {
    id: 'group-main',
    // title: <FormattedMessage id="main_menu" />,
    icon: defaultIcon,
    type: 'group',
    children: routers.map((route) => ({
      id: route.router,
      title: <FormattedMessage id={route.name} />,
      type: route.submenu && route.submenu.length > 0 ? 'collapse' : 'item',
      icon: defaultIcon,
      ...(route.submenu && route.submenu.length > 0
        ? {
            children: route.submenu.map((sub) => ({
              id: sub.router,
              title: <FormattedMessage id={sub.name} />,
              type: 'item',
              url: `/${route.router}/${sub.router}`
            }))
          }
        : { url: `/${route.router}` })
    }))
  };
};

// Generate the menu dynamically
const widget = generateMenu();

export default widget;
