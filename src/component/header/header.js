import React from 'react'
import './header.css'
import { Link, NavLink } from 'react-router-dom'

import logo from './logo.svg'

const Header = () => {

    return (
        <header className="navbar navbar-light bg-light">
      <div className="container">  
  <Link className="navbar-brand" to={'/'}>
    <img src={logo} width="40" height="40" alt="" style={{'marginTop':'0px'}} />
    <h1>React Blog</h1>
  </Link>
         <nav >
        
    <ul className="navbar-nav flex-row-reverse">
      <li className="nav-item p-2 ">
       <NavLink to={{pathname:'/new'}} activeClassName="activo" >Nuevo Post</NavLink>
      </li>
      <li className="nav-item p-2">
         <NavLink to={'/list'} activeClassName="activo" >Lista</NavLink>
      </li>
     
    </ul>
  
</nav>
        </div>
        
        </header>
    )
}

export default Header
