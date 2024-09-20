import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from "./NavBar.module.scss"

const NavBar = () => {
  return (
    <div className={styles.bar}>
      <h1>Employee DB</h1>
      <nav>
        <NavLink className={styles.link} to="/">Home</NavLink>
        <NavLink className={styles.link} to="/employees">Employees</NavLink>
        <NavLink className={styles.link} to="/employees/create">Enter a new employee</NavLink>
      </nav>
    </div>
  )
}

export default NavBar