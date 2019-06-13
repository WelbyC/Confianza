import React, { Component } from 'react'
import Navbar from '../../components/NavbarNoSearch/NavbarNoSearch'
import styles from './ContactUsPage.module.css'
import Login from '../../components/Login/Login'
import Signup from '../../components/Signup/Signup'
import LoginModal from '../../components/LoginModal/LoginModal'
import contact from '../../assets/images/contact.jpg'

class ContactUsPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loggingin: false,
            signingin: false
        }
    }

    closeModalHandler = () => {
        this.setState({ loggingin: false })
        this.setState({ signingin: false })
    }

    loggingInHandler = () => {
        this.setState({ loggingin: true })
    }

    signingInHandler = () => {
        this.setState({ signingin: true })
    }

    render() {

        let loginOrSignup = null
        if (this.state.loggingin == true) {
            loginOrSignup = <Login />
        }
        if (this.state.signingin == true) {
            loginOrSignup = <Signup />
        }

        return (
            <div className={styles['container']}>
                <div className={styles['content']}>
                    <LoginModal
                        show={this.state.loggingin || this.state.signingin}
                        modalClosed={this.closeModalHandler}>
                        {loginOrSignup}
                    </LoginModal>
                    
                    <Navbar
                        home={this.props.home}
                        login = {this.loggingInHandler}
                        signup = {this.signingInHandler}
                    />

                    <img className={styles['contact']} src={contact}/>
                    <div className = {styles['contact-link-container']}>
                    <a href="mailto:confianzanews@gmail.com?Subject=Customer%20Support" target="_top" className = {styles['contact-link']}>Contact Support</a>
                    </div>
                    
                    
                    </div>
                    
                    
                    <span className={styles['footer']}>
                        <span className={styles['footer-links']}>
                            <button className={styles['about-link']} onClick={this.props.about}>About</button>
                            <button className={styles['contact-us-link']} onClick={this.props.contact}>Contact Us</button>
                        </span>


                    </span>


                
            </div>
        );
    }
}

export default ContactUsPage;