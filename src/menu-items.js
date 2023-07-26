import {
  ADMINISTRATION_CLIENTS,
  ADMINISTRATION_EQUIPAMENTS,
  ADMINISTRATION_MANAGER_EXTRACT_NUBANK,
  ADMINISTRATION_PIECES,
  ADMINISTRATION_SEE_ALL_PERMISSIONS,
  ADMINISTRATION_SERVICES,
  FINANCIAL_SEE_ALL_EXPENSES,
  FINANCIAL_SEE_ALL_INCOME,
  MANAGER_SERVICE_ORDER,
} from './layouts/typePath'

const menuItems = {
  items: [
    // {
    //   id: 'navigation',
    //   title: 'Navigation',
    //   type: 'group',
    //   icon: 'icon-navigation',
    //   children: [
    //     {
    //       id: 'dashboard',
    //       title: 'Dashboard',
    //       type: 'item',
    //       url: '/app/dashboard/default',
    //       icon: 'feather icon-home',
    //     },
    //   ],
    // },
    {
      id: 'navigation',
      title: 'Orçamento e Ordem de serviço',
      type: 'group',
      icon: 'icon-navigation',
      children: [
        {
          id: 'service-order',
          title: 'Ordem de serviço',
          type: 'item',
          url: MANAGER_SERVICE_ORDER,
          // icon: 'feather icon-file',
          icon: 'orderServiceIcon',
          permission: 'ORDEM_SERVICO_VISUALIZAR',
        },
      ],
    },
    {
      id: 'ui-element',
      title: 'Financeiro',
      type: 'group',
      icon: 'icon-ui',
      children: [
        {
          id: 'income',
          title: 'Receitas',
          type: 'item',
          url: FINANCIAL_SEE_ALL_INCOME,
          //icon: 'feather icon-thumbs-up',
          icon: 'incomesIcon',
          permission: 'RECEITAS_VISUALIZAR',
        },
        {
          id: 'income',
          title: 'Despesas',
          type: 'item',
          url: FINANCIAL_SEE_ALL_EXPENSES,
          // icon: 'feather icon-thumbs-down',
          icon: 'expensesIcon',
          permission: 'DESPESAS_VISUALIZAR',
        },
      ],
    },
    {
      id: 'ui-element',
      title: 'Administração',
      type: 'group',
      icon: 'icon-ui',
      children: [
        {
          id: 'client',
          title: 'Clientes',
          type: 'item',
          url: ADMINISTRATION_CLIENTS,
          // icon: 'feather icon-users',
          icon: 'clientsIcon',
          permission: 'CLIENTES_VISUALIZAR',
        },
        {
          id: 'piece',
          title: 'Peças',
          type: 'item',
          url: ADMINISTRATION_PIECES,
          // icon: 'feather icon-settings',
          icon: 'piecesIcon',
          permission: 'PECAS_VISUALIZAR',
        },
        {
          id: 'service',
          title: 'Serviços',
          type: 'item',
          url: ADMINISTRATION_SERVICES,
          // icon: 'feather icon-file-text',
          icon: 'serviceIcon',
          permission: 'SERVICOS_VISUALIZAR',
        },
        {
          id: 'equipament',
          title: 'Equipamento',
          type: 'item',
          url: ADMINISTRATION_EQUIPAMENTS,
          // icon: 'feather icon-monitor',
          icon: 'equipamentIcon',
          permission: 'EQUIPAMENTOS_VISUALIZAR',
        },
        {
          id: 'permissions',
          title: 'Gestão de Usuários',
          type: 'item',
          url: ADMINISTRATION_SEE_ALL_PERMISSIONS,
          // icon: 'feather icon-monitor',
          icon: 'managerUsersIcon',
          permission: 'GESTAO_USUARIOS_VISUALIZAR',
        },
        {
          id: 'extract_nubank',
          title: 'Extrato de despesas',
          type: 'item',
          url: ADMINISTRATION_MANAGER_EXTRACT_NUBANK,
          // icon: 'feather icon-monitor',
          icon: 'extractNubankIcon',
          permission: 'EXTRATO_NUBANK_VISUALIZAR',
        },
        // {
        //   id: 'charts',
        //   title: 'Charts',
        //   type: 'item',
        //   url: '/charts/nvd3',
        //   icon: 'feather icon-pie-chart',
        // },
        {
          // id: 'basic',
          // title: 'Equipamentos',
          // type: 'collapse',
          // icon: 'feather icon-slack',
          // children: [
          // {
          //   id: 'badges',
          //   title: 'Buttons',
          //   type: 'item',
          //   url: '/basic/button',
          // },
          // {
          //   id: 'breadcrumb',
          //   title: 'Breadcrumb',
          //   type: 'item',
          //   url: '/basic/breadcrumb',
          // },
          // {
          //   id: 'collapse',
          //   title: 'Collapse',
          //   type: 'item',
          //   url: '/basic/collapse',
          // },
          // {
          //   id: 'tabs-pills',
          //   title: 'Tabs & Pills',
          //   type: 'item',
          //   url: '/basic/tabs-pills',
          // },
          // {
          //   id: 'typography',
          //   title: 'Typography',
          //   type: 'item',
          //   url: '/basic/typography',
          // },
          // ],
        },
        // {
        //   id: 'basic',
        //   title: 'WhatsApp',
        //   type: 'collapse',
        //   icon: 'feather icon-message-circle',
        //   children: [
        //     {
        //       id: 'button',
        //       title: 'Conexões',
        //       type: 'item',
        //       url: '/administration/connections',
        //     },
        //     {
        //       id: 'badges',
        //       title: 'Buttons',
        //       type: 'item',
        //       url: '/basic/button',
        //     },
        //     {
        //       id: 'badges',
        //       title: 'Badges',
        //       type: 'item',
        //       url: '/basic/badges',
        //     },
        //     {
        //       id: 'breadcrumb',
        //       title: 'Breadcrumb',
        //       type: 'item',
        //       url: '/basic/breadcrumb',
        //     },
        //     {
        //       id: 'collapse',
        //       title: 'Collapse',
        //       type: 'item',
        //       url: '/basic/collapse',
        //     },
        //     {
        //       id: 'tabs-pills',
        //       title: 'Tabs & Pills',
        //       type: 'item',
        //       url: '/basic/tabs-pills',
        //     },
        //     {
        //       id: 'typography',
        //       title: 'Typography',
        //       type: 'item',
        //       url: '/basic/typography',
        //     },
        //   ],
        // },
      ],
    },
    // {
    //   id: 'ui-forms',
    //   title: 'Forms & Tables',
    //   type: 'group',
    //   icon: 'icon-group',
    //   children: [
    //     {
    //       id: 'forms',
    //       title: 'Forms',
    //       type: 'item',
    //       url: '/forms/form-basic',
    //       icon: 'feather icon-file-text',
    //     },
    //     {
    //       id: 'bootstrap',
    //       title: 'Bootstrap Table',
    //       type: 'item',
    //       url: '/tables/bootstrap',
    //       icon: 'feather icon-server',
    //     },
    //   ],
    // },
    // {
    //   id: 'chart-maps',
    //   title: 'Chart & Maps',
    //   type: 'group',
    //   icon: 'icon-charts',
    //   children: [
    //     {
    //       id: 'charts',
    //       title: 'Charts',
    //       type: 'item',
    //       url: '/charts/nvd3',
    //       icon: 'feather icon-pie-chart',
    //     },
    //     {
    //       id: 'maps',
    //       title: 'Maps',
    //       type: 'item',
    //       url: '/maps/google-map',
    //       icon: 'feather icon-map',
    //     },
    //   ],
    // },
    // {
    //   id: 'pages',
    //   title: 'Pages',
    //   type: 'group',
    //   icon: 'icon-pages',
    //   children: [
    //     {
    //       id: 'auth',
    //       title: 'Authentication',
    //       type: 'collapse',
    //       icon: 'feather icon-lock',
    //       children: [
    //         {
    //           id: 'signup-2',
    //           title: 'Sign UP (template)',
    //           type: 'item',
    //           url: '/auth/signup-2',
    //           target: true,
    //           breadcrumbs: false,
    //         },
    //         {
    //           id: 'signin-2',
    //           title: 'Sign IN (template)',
    //           type: 'item',
    //           url: '/auth/signin-2',
    //           target: true,
    //           breadcrumbs: false,
    //         },
    //       ],
    //     },
    //     {
    //       id: 'sample-page',
    //       title: 'Sample Page',
    //       type: 'item',
    //       url: '/sample-page',
    //       classes: 'nav-item',
    //       icon: 'feather icon-sidebar',
    //     },
    //   ],
    // },
    // {
    //   id: 'resources',
    //   title: 'Resources',
    //   type: 'group',
    //   icon: 'icon-pages',
    //   children: [
    //     {
    //       id: 'product-page',
    //       title: 'Download Product',
    //       type: 'item',
    //       url: 'https://appseed.us/product/react-node-js-datta-able',
    //       classes: 'nav-item',
    //       icon: 'feather icon-download',
    //       target: true,
    //       external: true,
    //     },
    //     {
    //       id: 'support',
    //       title: 'Get Support',
    //       type: 'item',
    //       icon: 'feather icon-help-circle',
    //       classes: 'nav-item',
    //       url: 'https://appseed.us',
    //       target: true,
    //       external: true,
    //     },
    //   ],
    // },
  ],
}

export default menuItems
