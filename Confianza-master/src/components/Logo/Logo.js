import React from 'react'
import confianzaLogo from '../../assets/images/homepage-logo.png'
import styles from './Logo.module.css'
import ReactAux from '../../hoc/ReactAux/ReactAux'

const logo = (props) => {
    return (
        <ReactAux>
            <img className = {styles[props.style]} src={confianzaLogo} alt="C" onClick = {props.back}/>
        </ReactAux>
    );
}

export default logo;