import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ConfigContext } from '../../../../contexts/ConfigContext'
import * as actionType from '../../../../store/actions'
import InovationIcon from 'src/assets/images/inovacao.png'
import MenuIcon from '@mui/icons-material/Menu'
import { LinkStyled, LinkStyledNotCollapseMenu } from './styles'
import CloseIcon from '@mui/icons-material/Close'

const NavLogo = () => {
  const configContext = useContext(ConfigContext)
  const { collapseMenu } = configContext.state
  const { dispatch } = configContext

  let toggleClass = ['mobile-menu']
  if (collapseMenu) {
    toggleClass = [...toggleClass, 'on']
  }

  return (
    <React.Fragment>
      <div className="navbar-brand">
        <Link
          to="/dashboard"
          className="b-brand"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '80px',
            position: 'relative',
            top: '12px',
          }}
        >
          {/* <div className="b-bg">
            <i className="feather icon-trending-up"></i>
          </div> */}
          <img
            src={InovationIcon}
            alt="Logo"
            style={{
              width: '50px',
              marginLeft: `${!collapseMenu ? '46px' : '0px'}`,
            }}
          />
          {/* header-logo */}
          {!collapseMenu && <span className="b-title">Início</span>}
        </Link>
        {collapseMenu && (
          <LinkStyled
            to="#"
            // className={toggleClass.join(' ')}
            // id="mobile-collapse"
            onClick={() => dispatch({ type: actionType.COLLAPSE_MENU })}
            collapseMenu={collapseMenu}
          >
            <MenuIcon />
          </LinkStyled>
        )}
        {!collapseMenu && (
          <LinkStyledNotCollapseMenu
            to="#"
            // className={toggleClass.join(' ')}
            // id="mobile-collapse"
            onClick={() => dispatch({ type: actionType.COLLAPSE_MENU })}
            collapseMenu={collapseMenu}
          >
            <CloseIcon />
          </LinkStyledNotCollapseMenu>
        )}
      </div>
    </React.Fragment>
  )
}

export default NavLogo
