import React, { Component } from 'react';
import ReactAux from '../../hoc/ReactAux/ReactAux'
import zero from '../../assets/images/stars/0.png'
import styles from './NewReview.module.css'
import StarRatingComponent from 'react-star-rating-component';

const newReview = (props) => {
    return (
        <ReactAux>
            <button className={styles['close-window-button']} onClick={props.closeReview}>X</button>
            <h3 className={styles['header']}>Create Review</h3>
            <p className = {styles['overall-rating-text']}>Overall rating</p>
            
            {props.children}

            {/*<img src={zero} className={styles['stars']} />*/}

            <p>Add a headline</p>

            <input
                id="myinput"
                className={styles['headline']}
                placeholder="What's most important to know?"
                value={props.headlineValue}
                onChange={props.headlineChange} />

            <p>Write your review</p>

            <textarea
                rows="10" cols="74"
                className={styles['text-box']}
                placeholder="What's on your mind?"
                value={props.commentValue}
                onChange={props.commentChange} />

            <button
                className={styles['submit-button']}
                onClick={(event) => { props.reviewSubmitted();}}

            >Submit
            </button>
        </ReactAux>
    );
}

export default newReview;