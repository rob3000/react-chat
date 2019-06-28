import * as React from 'react';
import chatSrc from 'images/chat.svg';
import settingsSrc from 'images/settings.svg';
import logoutSrc from 'images/logout.svg';
import { AuthInterface } from 'auth';
import { NavLink } from 'react-router-dom';

import './menu.scss'

interface MenuProps {
  auth: AuthInterface
}

const UserMenu: React.SFC<MenuProps> = (props) => {
  return(
    <ul className="menu">
      <li className="menu__item">

        <NavLink className="menu__link" activeClassName="is-active" to="/">
          <object
            className="menu__icon"
            type="image/svg+xml"
            data={chatSrc}>
              Your browser does not support SVGs
          </object>
          <span className="menu__text">Chat</span>
        </NavLink>
      </li>
      <li className="menu__item">
        <NavLink className="menu__link" activeClassName="is-active" to="/settings">
          <object
            className="menu__icon"
            type="image/svg+xml"
            data={settingsSrc}>
              Your browser does not support SVGs
          </object>
          <span className="menu__text">Settings</span>
        </NavLink>
      </li>
      <li className="menu__item">
        <a className="menu__link" href="#" onClick={props.auth.logout}>
          <object
            className="menu__icon"
            type="image/svg+xml"
            data={logoutSrc}>
              Your browser does not support SVGs
          </object>
          <span className="menu__text">Logout</span>
        </a>
      </li>
    </ul>
  )
}

export default UserMenu;
