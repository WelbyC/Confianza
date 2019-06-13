import React from 'react'
import Logo from '../Logo/Logo'
import SearchBar from '../SearchBar/SearchBar'
import styles from './NavbarNoSearch.module.css'

const navbar = (props) => (
    <header className={styles['navbar']}>
        <Logo style='small' />


        <span className={styles['buttons']}>
        <button className={styles['home']} onClick = {props.home}>Home</button>
        <span className = {styles['separation']}>|</span>
            <button className={styles['login']} onClick = {props.login}>Log In</button>
            <button className={styles['signup']} onClick = {props.signup}>Sign Up</button>
        </span>

    </header>
);

export default navbar