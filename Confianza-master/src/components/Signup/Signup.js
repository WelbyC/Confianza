import React, { Component } from 'react';
import ReactAux from '../../hoc/ReactAux/ReactAux'
import styles from './Signup.module.css'

const signup = (props) => {
    return (
        <ReactAux>
            <h3 className={styles['signup-text']}>Sign Up</h3>
            <p>Please fill in this form to create an account.</p>
            <hr/>
            <div className={styles['email-text']}>Email</div>
            <input type="text" placeholder="Enter Email" className={styles['email-input']} />
            <div className={styles['password-text']}>Password</div>
            <input type="password" placeholder="Enter Password" className={styles['password-input']} />
            <div className={styles['repeat-password-text']}>Password</div>
            <input type="password" placeholder="Repeat Password" className={styles['repeat-password-input']} />
            <label>
                <input type="checkbox" checked="checked" name="remember" className={styles['checkbox']} /> Remember me
            </label>

            <p>By creating an account you agree to our <a href="#">Terms & Privacy</a>.</p>

            <div className={styles["clearfix"]}>
                <button type="button" className={styles["cancelbtn"]}>Cancel</button>
                <button type="button" className={styles["signupbtn"]}>Sign Up</button>
            </div>
        </ReactAux>
    );
}

export default signup;