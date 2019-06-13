import React, { Component } from 'react'
import styles from './HomePage.module.css'
import Logo from '../../components/Logo/Logo'
import searchIcon from '../../assets/images/search-icon.png'
import LoginModal from '../../components/LoginModal/LoginModal'
import Login from '../../components/Login/Login'
import Signup from '../../components/Signup/Signup'

class HomePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loggingin : false,
            signingin: false
        }
    }

    closeModalHandler = () => {
        this.setState({ loggingin: false })
        this.setState({ signingin: false })
    }

    loggingInHandler = () => {
        this.setState({loggingin: true})
    }

    signingInHandler = () => {
        this.setState({signingin: true})
    }

    render() {

        let loginOrSignup = null
        if(this.state.loggingin == true){
            loginOrSignup = <Login/>
        }
        if(this.state.signingin == true){
            loginOrSignup = <Signup/>
        }

        return (

            <div>

                <LoginModal
                    show={this.state.loggingin || this.state.signingin}
                    modalClosed={this.closeModalHandler}>
                    {loginOrSignup}
                </LoginModal>

                <span className={styles['login-and-signup']}>
                    <button className={styles['login'] } onClick = {this.loggingInHandler}>Log In</button>
                    <button className={styles['signup']} onClick = {this.signingInHandler}>Sign Up</button>
                </span>

                <Logo style='large' />

                <div className={styles['search-bar']}>
                    <input
                        className={styles['search-txt']}
                        type="text" name=""
                        placeholder="Type a name"
                        value={this.props.nameValue}
                        onChange={this.props.nameChange}
                        onKeyDown={(event) => { if (event.keyCode == 13) { this.props.clicked() } }}
                    />

                    <a className={styles['search-btn']}
                        onClick={(event) => { this.props.clicked(); }}>

                        <img className={styles['search-icon']} src={searchIcon} alt="S" />
                    </a>
                </div>

                <div className={styles['results-not-found']}>
                    {this.props.showError ? "No results found for: " + this.props.failedNameSearch : null}
                </div>

                <div className={styles['quote']}>Get the truth and print it.</div>

                <span className={styles['footer']} />
                <span className={styles['footer-links']}>
                    <button className={styles['about-link']} onClick={this.props.about}>About</button>
                    <button className={styles['contact-us-link']} onClick = {this.props.contact}>Contact Us</button>
                </span>


            </div>
        );
    }
}

export default HomePage;