import React, { useContext } from 'react'
import { ListGroup } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import NavIcon from '../NavIcon'
import NavBadge from '../NavBadge'

import { ConfigContext } from '../../../../../contexts/ConfigContext'
import * as actionType from '../../../../../store/actions'
import useWindowSize from '../../../../../hooks/useWindowSize'
/** Material UI */
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip'
import { styled } from '@mui/material/styles'

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    // backgroundColor: theme.palette.common.white,
    backgroundColor: '#3f4d67',
    // color: 'rgba(0, 0, 0, 0.87)',
    color: '#FFF',
    boxShadow: theme.shadows[1],
    fontSize: 11,
    position: 'relative',
    right: '100px',
    bottom: '20px',
  },
}))

const NavItem = ({ layout, item }) => {
  const windowSize = useWindowSize()
  const configContext = useContext(ConfigContext)
  const { dispatch } = configContext

  let itemTitle = item.title
  if (item.icon) {
    itemTitle = <span className="pcoded-mtext">{item.title}</span>
  }

  let itemTarget = ''
  if (item.target) {
    itemTarget = '_blank'
  }

  let subContent
  if (item.external) {
    subContent = (
      <a href={item.url} target="_blank" rel="noopener noreferrer">
        <NavIcon items={item} />
        {itemTitle}
        <NavBadge items={item} />
      </a>
    )
  } else {
    subContent = (
      <NavLink
        to={item.url}
        className="nav-link"
        exact={true}
        target={itemTarget}
      >
        <NavIcon items={item} />
        {itemTitle}
        {/* <NavBadge items={item} /> */}
      </NavLink>
    )
  }
  let mainContent = ''
  if (layout === 'horizontal') {
    mainContent = (
      <ListGroup.Item
        as="li"
        bsPrefix=" "
        onClick={() => dispatch({ type: actionType.NAV_CONTENT_LEAVE })}
      >
        {subContent}
      </ListGroup.Item>
    )
  } else {
    if (windowSize.width < 992) {
      mainContent = (
        <ListGroup.Item
          as="li"
          bsPrefix=" "
          className={item.classes}
          onClick={() => dispatch({ type: actionType.COLLAPSE_MENU })}
        >
          {subContent}
        </ListGroup.Item>
      )
    } else {
      mainContent = (
        <ListGroup.Item as="li" bsPrefix=" " className={item.classes}>
          <LightTooltip placement="right" title={itemTitle}>
            {subContent}
          </LightTooltip>
        </ListGroup.Item>
      )
    }
  }

  return <React.Fragment>{mainContent}</React.Fragment>
}

export default NavItem
