import { DASHBOARD } from 'src/layouts/typePath'

export const BASENAME = '' // don't add '/' at end off BASENAME
export const BASE_URL = DASHBOARD
export const BASE_TITLE = ' | WhatsManager '
export const API_SERVER = process.env.REACT_APP_ADMIN_API_HOST

export const CONFIG = {
  layout: 'vertical', // disable on free version
  subLayout: '', // disable on free version
  collapseMenu: true, // mini-menu
  layoutType: 'menu-dark', // disable on free version
  navIconColor: false, // disable on free version
  headerBackColor: 'header-default', // disable on free version
  navBackColor: 'navbar-default', // disable on free version
  navBrandColor: 'brand-default', // disable on free version
  navBackImage: false, // disable on free version
  rtlLayout: false, // disable on free version
  navFixedLayout: true, // disable on free version
  headerFixedLayout: false, // disable on free version
  boxLayout: false, // disable on free version
  navDropdownIcon: 'style1', // disable on free version
  navListIcon: 'style1', // disable on free version
  navActiveListColor: 'active-default', // disable on free version
  navListTitleColor: 'title-default', // disable on free version
  navListTitleHide: false, // disable on free version
  configBlock: true, // disable on free version
  layout6Background:
    'linear-gradient(to right, #A445B2 0%, #D41872 52%, #FF0066 100%)', // disable on free version
  layout6BackSize: '', // disable on free version
}
